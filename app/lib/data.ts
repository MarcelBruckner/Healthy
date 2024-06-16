import { sql } from "@vercel/postgres";
import { Food, FoodDB } from "./definitions";
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
    const totalNumberOfEntries = 0;
    const numberOfFoods = 0;
    const numberOfDrinks = 0;
    const numberOfPoops = 0;

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
    throw new Error("Failed to fetch invoices.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredFoods(query: string, currentPage: number) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const filteredEntries = await fetchFilteredFoodsUnpaginated(query);

    return filteredEntries.slice(offset, offset + ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
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

export async function fetchFoodById(id: string) {
  noStore();

  try {
    const entry = await prisma?.food.findUnique({
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

export async function fetchLatestFoods(): Promise<FoodDB[]> {
  return (
    (await prisma?.food.findMany({
      orderBy: { datetime: "desc" },
      take: 5
    })) ?? []
  );
}

export async function fetchFoods(): Promise<Food[]> {
  return (
    (await prisma?.food.findMany({
      orderBy: { datetime: "desc" }
    })) ?? []
  );
}
