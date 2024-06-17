import { sql } from "@vercel/postgres";
import { Food, FoodDB, PoopDB } from "./definitions";
import { formatCurrency } from "./utils";
import { promises as fs } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import moment from "moment";
import prisma from "./prisma";
const { stringify } = require("csv-stringify/sync");

function getDataPath() {
  if (process.env.DATA_PATH) {
    return process.env.DATA_PATH;
  }
  return "./data";
}

const ENTRIES_CSV = `${getDataPath()}/entries.csv`;

export async function readJsonFile(path: string) {
  noStore();

  const fileContent = await fs.readFile(path, "utf8");
  var values = JSON.parse(fileContent);
  // console.log(values);
  return values;
}

export async function fetchCardData() {
  noStore();

  try {
    const numberOfFoods = await countFoods();
    const numberOfDrinks = 0;
    const numberOfPoops = await countPoops();

    const totalNumberOfEntries = numberOfDrinks + numberOfFoods + numberOfPoops;

    return {
      totalNumberOfEntries,
      numberOfFoods,
      numberOfDrinks,
      numberOfPoops
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

async function fetchFilteredFoodsUnpaginated(query: string): Promise<FoodDB[]> {
  noStore();

  try {
    return await prisma?.food.findMany({
      orderBy: { datetime: "desc" },
      where: {
        OR: [
          {
            motivation: {
              contains: query
            }
          },
          {
            beschwerden: {
              contains: query
            }
          },
          {
            getraenke: {
              contains: query
            }
          },
          {
            ort: {
              contains: query
            }
          },
          {
            speisen: {
              contains: query
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch foods.");
  }
}

async function fetchFilteredPoopsUnpaginated(query: string): Promise<PoopDB[]> {
  noStore();

  try {
    const possibleQueryNumber = !query || isNaN(+query) ? -1 : +query;

    return await prisma?.poop.findMany({
      orderBy: { datetime: "desc" },
      where: {
        OR: [
          {
            stuhlverhalten: {
              contains: query
            }
          },
          {
            stuhltyp: {
              equals: possibleQueryNumber
            }
          },
          {
            stuhlverhalten: {
              contains: query
            }
          },
          {
            therapie: {
              contains: query
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch poops.");
  }
}

const ITEMS_PER_PAGE = 6;
async function fetchFilteredEntries(
  fetchFunc: (query: string) => Promise<any[]>,
  query: string,
  currentPage: number
) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const filteredEntries = await fetchFunc(query);

    return filteredEntries.slice(offset, offset + ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchFilteredFoods(query: string, currentPage: number) {
  return await fetchFilteredEntries(
    fetchFilteredFoodsUnpaginated,
    query,
    currentPage
  );
}

export async function fetchFilteredPoops(query: string, currentPage: number) {
  return await fetchFilteredEntries(
    fetchFilteredPoopsUnpaginated,
    query,
    currentPage
  );
}

export async function fetchFoodPages(query: string) {
  noStore();
  try {
    const foods = await fetchFilteredFoodsUnpaginated(query);

    const totalPages = Math.ceil(Number(foods.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of entries.");
  }
}

async function fetchById(prismaFunc: any, id: string) {
  noStore();

  try {
    const entry = await prismaFunc.findUnique({
      where: {
        id: id
      }
    });
    return entry;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch entry.");
  }
}

export async function fetchFoodById(id: string) {
  return await fetchById(prisma.food, id);
}

export async function fetchPoopById(id: string) {
  return await fetchById(prisma.poop, id);
}

export async function fetchLatestFoods(): Promise<FoodDB[]> {
  noStore();

  try {
    return (
      (await prisma?.food.findMany({
        orderBy: { datetime: "desc" },
        take: 5
      })) ?? []
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch entry.");
  }
}

export async function fetchFoods(): Promise<FoodDB[]> {
  noStore();

  try {
    return (
      (await prisma?.food.findMany({
        orderBy: { datetime: "desc" }
      })) ?? []
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch entry.");
  }
}

export async function fetchPoops(): Promise<PoopDB[]> {
  noStore();

  try {
    return (
      (await prisma?.poop.findMany({
        orderBy: { datetime: "desc" }
      })) ?? []
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch entry.");
  }
}

export async function countFoods() {
  noStore();

  try {
    return await prisma.food.count();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch foods.");
  }
}

export async function countPoops() {
  noStore();

  try {
    return await prisma.poop.count();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch poops.");
  }
}
