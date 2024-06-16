"use server";
import { z } from "zod";
import { Food } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import moment from "moment";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import prisma from "./prisma";

const DATETIME_ERROR = {
  datum: ["Das Datum darf nicht in der Zukunft liegen."]
};

const FOOD_AND_DRINKS_ERROR = {
  ort: ["Bitte entweder einen Ort oder die Motivation der Mahlzeit angeben."],
  motivation: [
    "Bitte entweder einen Ort oder die Motivation der Mahlzeit angeben."
  ],
  speisen: ["Bitte mindestens Speisen oder Getränke angeben."],
  getraenke: ["Bitte mindestens Speisen oder Getränke angeben."]
};

const POOP_ERROR = {
  stuhltyp: ["Bitte den Stuhltyp angeben. Siehe Infos."],
  stuhlverhalten: ["Bitte das Stuhlverhalten angeben."]
};

export type StateFood = {
  errors?: {
    datum?: string[];
    uhrzeit?: string[];
    ort?: string[];
    motivation?: string[];
    speisen?: string[];
    getraenke?: string[];
    beschwerden?: string[];
  };
  message?: string | null;
};

export type StatePoop = {
  errors?: {
    anmerkungen?: string[];
    stuhltyp?: string[];
    stuhlverhalten?: string[];
    therapie?: string[];
  };
  message?: string | null;
};

const FormSchemaFood = z.object({
  id: z.string(),
  datum: z.string().date(),
  uhrzeit: z.string().time(),
  ort: z.string(),
  motivation: z.string(),
  speisen: z.string(),
  getraenke: z.string(),
  beschwerden: z.string()
});

const CreateFood = FormSchemaFood.omit({ id: true });

function validateFormData(formData: FormData): Food {
  let validatedFields = CreateFood.safeParse({
    datum: formData.get("datum"),
    uhrzeit: formData.get("uhrzeit"),
    ort: formData.get("ort"),
    motivation: formData.get("motivation"),
    speisen: formData.get("speisen"),
    getraenke: formData.get("getraenke"),
    beschwerden: formData.get("beschwerden")
  });
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Beim Extrahieren der Daten ist ein Fehler aufgetreten!"
    };
  }

  const datetime = moment(
    validatedFields.data.datum + " " + validatedFields.data.uhrzeit,
    "YYYY-MM-DD HH:mm"
  );

  if (datetime.isAfter(Date.now())) {
    throw {
      errors: Object.assign({}, DATETIME_ERROR),
      message: "Das Datum darf nicht in der Zukunft liegen!"
    };
  }

  if (!validatedFields.data.getraenke && !validatedFields.data.speisen) {
    throw {
      errors: getFoodAndDrinksError(validatedFields),
      message: "Essen und Trinken ist nicht vollständig!"
    };
  }

  let food: Food = {
    datetime: datetime.toDate(),
    ort: validatedFields.data.ort,
    motivation: validatedFields.data.motivation,
    speisen: validatedFields.data.speisen,
    getraenke: validatedFields.data.getraenke,
    beschwerden: validatedFields.data.beschwerden
  };
  return food;
}

function isFood(data: StateFood | Food): data is Food {
  return (<Food>data).speisen !== undefined;
}

function handleFoodError(err: any) {
  if (err instanceof PrismaClientValidationError) {
    return {
      message:
        "Database Error: Failed to Create Entry." +
        (err as PrismaClientValidationError).message
    };
  }
  return err as StateFood;
}

export async function createFood(prevState: StateFood, formData: FormData) {
  try {
    const validatedFields = validateFormData(formData);
    await prisma?.food.create({ data: validatedFields });
  } catch (err) {
    return handleFoodError(err);
  }
  revalidatePath("/dashboard/food");
  redirect("/dashboard/food");
}

export async function updateFood(
  id: string,
  prevState: StateFood,
  formData: FormData
) {
  try {
    const validatedFields = validateFormData(formData);
    await prisma?.food.update({ where: { id: id }, data: validatedFields });
  } catch (err) {
    return handleFoodError(err);
  }
  revalidatePath("/dashboard/food");
  redirect("/dashboard/food");
}

export async function copyFood(
  id: string,
  prevState: StateFood,
  formData: FormData
) {
  return createFood(prevState, formData);
}

export async function deleteInvoice(id: string) {
  try {
    await prisma?.food.delete({ where: { id: id } });
    revalidatePath("/dashboard/food");
    return { message: "Deleted Entry." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Entry."
    };
  }
}

function hasPoop(
  validatedFields: z.SafeParseSuccess<{
    datum: string;
    uhrzeit: string;
    ort: string;
    motivation: string;
    speisen: string;
    getraenke: string;
    beschwerden: string;
    stuhltyp: number;
    stuhlverhalten: string;
    therapie: string;
    anmerkungen: string;
  }>
) {
  return (
    validatedFields.data?.stuhltyp !== 0 ||
    validatedFields.data?.stuhlverhalten !== "" ||
    validatedFields.data?.therapie !== ""
  );
}

function getPoopError(
  validatedFields: z.SafeParseSuccess<{
    datum: string;
    uhrzeit: string;
    ort: string;
    motivation: string;
    speisen: string;
    getraenke: string;
    beschwerden: string;
    stuhltyp: number;
    stuhlverhalten: string;
    therapie: string;
    anmerkungen: string;
  }>
) {
  let result: { [id: string]: string[] } = {};

  if (validatedFields.data?.stuhltyp === 0) {
    result["stuhltyp"] = POOP_ERROR["stuhltyp"];
  }
  if (validatedFields.data?.stuhlverhalten === "") {
    result["stuhlverhalten"] = POOP_ERROR["stuhlverhalten"];
  }

  return result;
}

function hasValidPoop(
  validatedFields: z.SafeParseSuccess<{
    datum: string;
    uhrzeit: string;
    ort: string;
    motivation: string;
    speisen: string;
    getraenke: string;
    beschwerden: string;
    stuhltyp: number;
    stuhlverhalten: string;
    therapie: string;
    anmerkungen: string;
  }>
) {
  return (
    validatedFields.data?.stuhltyp !== 0 &&
    validatedFields.data?.stuhlverhalten !== ""
  );
}

function getFoodAndDrinksError(
  validatedFields: z.SafeParseSuccess<{
    datum: string;
    uhrzeit: string;
    ort: string;
    motivation: string;
    speisen: string;
    getraenke: string;
    beschwerden: string;
  }>
) {
  let result: { [id: string]: string[] } = {};

  if (!validatedFields.data?.speisen && !validatedFields.data?.getraenke) {
    result["speisen"] = FOOD_AND_DRINKS_ERROR["speisen"];
    result["getraenke"] = FOOD_AND_DRINKS_ERROR["getraenke"];
  }

  return result;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
