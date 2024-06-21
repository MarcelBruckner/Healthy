"use server";
import { z } from "zod";
import { Food, Toilet } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import moment from "moment";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import prisma from "./prisma";

export async function serverSignOut() {
  await signOut();
}

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
    anmerkungen?: string[];
  };
  message?: string | null;
};

export type StateToilet = {
  errors?: {
    datum?: string[];
    uhrzeit?: string[];
    urinmenge?: string[];
    urindruck?: string[];
    stuhltyp?: string[];
    stuhlfarbe?: string[];
    stuhlmenge?: string[];
    stuhldruck?: string[];
    therapie?: string[];
    anmerkungen?: string[];
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
  beschwerden: z.string(),
  anmerkungen: z.string()
});

const FormSchemaPoop = z.object({
  id: z.string(),
  datum: z.string().date(),
  uhrzeit: z.string(),
  urinmenge: z.coerce.number(),
  urindruck: z.coerce.number(),
  stuhltyp: z.coerce.number(),
  stuhlfarbe: z.coerce.number(),
  stuhlmenge: z.coerce.number(),
  stuhldruck: z.coerce.number(),
  therapie: z.string(),
  anmerkungen: z.string()
});

const CreateFood = FormSchemaFood.omit({ id: true });
const CreatePoop = FormSchemaPoop.omit({ id: true });

function validateDatetime(datum: string, uhrzeit: string) {
  const datetime = moment(datum + " " + uhrzeit, "YYYY-MM-DD HH:mm");

  if (datetime.isAfter(moment().add(1, "days").toDate())) {
    throw {
      errors: DATETIME_ERROR,
      message: "Das Datum darf nicht in der Zukunft liegen!"
    };
  }

  return datetime;
}

function validateFoodFormData(formData: FormData): Food {
  let validatedFields = CreateFood.safeParse({
    datum: formData.get("datum"),
    uhrzeit: formData.get("uhrzeit"),
    ort: formData.get("ort"),
    motivation: formData.get("motivation"),
    speisen: formData.get("speisen"),
    getraenke: formData.get("getraenke"),
    beschwerden: formData.get("beschwerden"),
    anmerkungen: formData.get("anmerkungen")
  });
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Beim Extrahieren der Daten ist ein Fehler aufgetreten!"
    };
  }

  const datetime = validateDatetime(
    validatedFields.data.datum,
    validatedFields.data.uhrzeit
  );

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
    beschwerden: validatedFields.data.beschwerden,
    anmerkungen: validatedFields.data.anmerkungen
  };
  return food;
}

function validateToiletFormData(formData: FormData): Toilet {
  let validatedFields = CreatePoop.safeParse({
    datum: formData.get("datum"),
    uhrzeit: formData.get("uhrzeit"),
    urinmenge: formData.get("urinmenge"),
    urindruck: formData.get("urindruck"),
    stuhltyp: formData.get("stuhltyp"),
    stuhlfarbe: formData.get("stuhlfarbe"),
    stuhlmenge: formData.get("stuhlmenge"),
    stuhldruck: formData.get("stuhldruck"),
    therapie: formData.get("therapie"),
    anmerkungen: formData.get("anmerkungen")
  });
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Beim Extrahieren der Daten ist ein Fehler aufgetreten!"
    };
  }

  const datetime = validateDatetime(
    validatedFields.data.datum,
    validatedFields.data.uhrzeit
  );

  const toilet: Toilet = {
    datetime: datetime.toDate(),
    urinmenge: validatedFields.data.urinmenge,
    urindruck: validatedFields.data.urindruck,
    stuhltyp: validatedFields.data.stuhltyp,
    stuhlfarbe: validatedFields.data.stuhlfarbe,
    stuhlmenge: validatedFields.data.stuhlmenge,
    stuhldruck: validatedFields.data.stuhldruck,
    therapie: validatedFields.data.therapie,
    anmerkungen: validatedFields.data.anmerkungen
  };
  return toilet;
}

function handleFoodError(err: any) {
  if (err instanceof PrismaClientValidationError) {
    return {
      message:
        "Database Error: Failed to Create Entry." +
        (err as PrismaClientValidationError).message
    };
  }

  if ((err as StateFood).errors?.speisen) {
    return err as StateFood;
  }

  if ((err as StateToilet).errors?.stuhltyp) {
    return err as StateToilet;
  }

  return {
    message: "Unkown state error."
  };
}

export async function createFood(prevState: StateFood, formData: FormData) {
  try {
    const validatedFields = validateFoodFormData(formData);
    await prisma?.food.create({ data: validatedFields });
  } catch (err) {
    return handleFoodError(err) as StateFood;
  }
  revalidatePath("/dashboard/food");
  redirect("/dashboard/food");
}

export async function createToilet(
  prevState: StateToilet,
  formData: FormData
): Promise<StateToilet> {
  try {
    const validatedFields = validateToiletFormData(formData);
    await prisma?.toilet.create({ data: validatedFields });
  } catch (err) {
    return handleFoodError(err) as StateToilet;
  }
  revalidatePath("/dashboard/toilet");
  redirect("/dashboard/toilet");
}

export async function updateFood(
  id: string,
  prevState: StateFood,
  formData: FormData
) {
  try {
    const validatedFields = validateFoodFormData(formData);
    await prisma?.food.update({ where: { id: id }, data: validatedFields });
  } catch (err) {
    return handleFoodError(err);
  }
  revalidatePath("/dashboard/food");
  redirect("/dashboard/food");
}

export async function updatePoop(
  id: string,
  prevState: StateFood,
  formData: FormData
) {
  try {
    const validatedFields = validateToiletFormData(formData);
    await prisma?.toilet.update({ where: { id: id }, data: validatedFields });
  } catch (err) {
    return handleFoodError(err) as StateToilet;
  }
  revalidatePath("/dashboard/toilet");
  redirect("/dashboard/toilet");
}

export async function copyFood(
  id: string,
  prevState: StateFood,
  formData: FormData
) {
  return createFood(prevState, formData);
}

export async function copyPoop(
  id: string,
  prevState: StateToilet,
  formData: FormData
) {
  return createToilet(prevState, formData);
}

export async function deleteFood(id: string) {
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
export async function deleteToilet(id: string) {
  try {
    await prisma?.toilet.delete({ where: { id: id } });
    revalidatePath("/dashboard/toilet");
    return { message: "Deleted Entry." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Entry."
    };
  }
}

function getPoopError(
  validatedFields: z.SafeParseSuccess<{
    datum: string;
    uhrzeit: string;
    stuhltyp: number;
    stuhlverhalten: string;
    therapie: string;
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
