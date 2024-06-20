import { FoodDB, ToiletDB } from "./definitions";
import { promises as fs } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prisma";

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

export async function fetchFilteredFoods(query: string): Promise<FoodDB[]> {
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

export async function fetchFilteredToilets(query: string): Promise<ToiletDB[]> {
  noStore();

  try {
    const possibleQueryNumber = !query || isNaN(+query) ? -1 : +query;

    return await prisma?.toilet.findMany({
      orderBy: { datetime: "desc" },
      where: {
        OR: [
          {
            stuhltyp: {
              equals: possibleQueryNumber
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
    throw new Error("Failed to fetch toilets.");
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFoodPages(query: string) {
  noStore();
  try {
    const foods = await fetchFilteredFoods(query);

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
  return await fetchById(prisma.toilet, id);
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

export async function fetchPoops(): Promise<ToiletDB[]> {
  noStore();

  try {
    return (
      (await prisma?.toilet.findMany({
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
    return await prisma.toilet.count();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch toilets.");
  }
}
