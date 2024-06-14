"use server";
import { z } from "zod";
import { Entry } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { fetchEntries, writeEntries } from "./data";
import { v4 as uuidv4 } from "uuid";

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

export type State = {
  errors?: {
    datum?: string[];
    uhrzeit?: string[];
    ort?: string[];
    motivation?: string[];
    speisen?: string[];
    getraenke?: string[];
    beschwerden?: string[];
    stuhltyp?: string[];
    stuhlverhalten?: string[];
    therapie?: string[];
    anmerkungen?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  datum: z.string().date(),
  uhrzeit: z.string().time(),
  ort: z.string(),
  motivation: z.string(),
  speisen: z.string(),
  getraenke: z.string(),
  beschwerden: z.string(),
  stuhltyp: z.coerce.number(),
  stuhlverhalten: z.string(),
  therapie: z.string(),
  anmerkungen: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true });
const UpdateInvoice = FormSchema.omit({ id: true });

function validateFormData(formData: FormData, id?: string): State | Entry {
  const validatedFields = CreateInvoice.safeParse({
    datum: formData.get("datum"),
    uhrzeit: formData.get("uhrzeit"),
    ort: formData.get("ort"),
    motivation: formData.get("motivation"),
    speisen: formData.get("speisen"),
    getraenke: formData.get("getraenke"),
    beschwerden: formData.get("beschwerden"),
    stuhltyp: formData.get("stuhltyp"),
    stuhlverhalten: formData.get("stuhlverhalten"),
    therapie: formData.get("therapie"),
    anmerkungen: formData.get("anmerkungen")
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Beim Extrahieren der Daten ist ein Fehler aufgetreten!"
    };
  }

  if (!hasFoodAndDrinks(validatedFields) && !hasPoop(validatedFields)) {
    return {
      errors: Object.assign({}, FOOD_AND_DRINKS_ERROR, POOP_ERROR),
      message: "Entweder eine Mahlzeit oder Stuhlgang eintragen!"
    };
  }

  if (
    hasFoodAndDrinks(validatedFields) &&
    !hasValidFoodAndDrinks(validatedFields)
  ) {
    return {
      errors: getFoodAndDrinksError(validatedFields),
      message: "Mahlzeit ist nicht vollständig!"
    };
  }

  if (hasPoop(validatedFields) && !hasValidPoop(validatedFields)) {
    return {
      errors: getPoopError(validatedFields),
      message: "Stuhlgang ist nicht vollständig!"
    };
  }

  if (!id) {
    id = uuidv4();
  }
  return { id: id, ...validatedFields.data };
}

function isEntry(data: State | Entry): data is Entry {
  return (<Entry>data).stuhltyp !== undefined;
}

export async function createEntry(prevState: State, formData: FormData) {
  const validatedFields = validateFormData(formData);
  if (!isEntry(validatedFields)) {
    return validatedFields;
  }

  try {
    let entries = await fetchEntries();
    entries.push(validatedFields);
    await writeEntries(entries);
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Entry."
    };
  }
  revalidatePath("/dashboard/entries");
  redirect("/dashboard/entries");
}

export async function updateEntry(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = validateFormData(formData, id);
  if (!isEntry(validatedFields)) {
    return validatedFields;
  }

  try {
    let entries = await fetchEntries();
    entries = entries.filter(entry => entry.id !== id);
    entries.push(validatedFields);
    await writeEntries(entries);
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Entry."
    };
  }

  revalidatePath("/dashboard/entries");
  redirect("/dashboard/entries");
}

export async function copyEntry(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = validateFormData(formData);
  if (!isEntry(validatedFields)) {
    return validatedFields;
  }

  try {
    let entries = await fetchEntries();
    entries.push(validatedFields);
    await writeEntries(entries);
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Entry."
    };
  }

  revalidatePath("/dashboard/entries");
  redirect("/dashboard/entries");
}

export async function deleteInvoice(id: string) {
  let entries = await fetchEntries();
  entries = entries.filter(entry => entry.id !== id);

  try {
    writeEntries(entries);
    revalidatePath("/dashboard/entries");
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

function hasFoodAndDrinks(
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
    validatedFields.data?.ort !== "" ||
    validatedFields.data?.motivation !== "" ||
    validatedFields.data?.speisen !== "" ||
    validatedFields.data?.getraenke !== ""
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
    stuhltyp: number;
    stuhlverhalten: string;
    therapie: string;
    anmerkungen: string;
  }>
) {
  let result: { [id: string]: string[] } = {};

  if (
    validatedFields.data?.ort === "" &&
    validatedFields.data?.motivation === ""
  ) {
    result["ort"] = FOOD_AND_DRINKS_ERROR["ort"];
    result["motivation"] = FOOD_AND_DRINKS_ERROR["motivation"];
  }

  if (
    validatedFields.data?.speisen === "" &&
    validatedFields.data?.getraenke === ""
  ) {
    result["speisen"] = FOOD_AND_DRINKS_ERROR["speisen"];
    result["getraenke"] = FOOD_AND_DRINKS_ERROR["getraenke"];
  }

  return result;
}

function hasValidFoodAndDrinks(
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
    (validatedFields.data?.ort !== "" ||
      validatedFields.data?.motivation !== "") &&
    (validatedFields.data?.speisen !== "" ||
      validatedFields.data?.getraenke !== "")
  );
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
