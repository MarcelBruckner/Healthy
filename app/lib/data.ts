import { sql } from "@vercel/postgres";
import { CustomersTableType, User, Customer, Entry } from "./definitions";
import { formatCurrency } from "./utils";
import { promises as fs } from "fs";
import { unstable_noStore as noStore } from "next/cache";
const { stringify } = require("csv-stringify/sync");
const { parse } = require("csv-parse");

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

export async function fetchCustomers(): Promise<Customer[]> {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: "no-store"}).
  noStore();

  try {
    return await readJsonFile("./app/lib/customers.json");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchCardData() {
  noStore();

  try {
    const entries = await fetchEntries();
    const totalNumberOfEntries = entries.length;
    const numberOfFoods = entries.filter(entry => entry.speisen !== "").length;
    const numberOfDrinks = entries.filter(
      entry => entry.getraenke !== ""
    ).length;
    const numberOfPoops = entries.filter(entry => entry.stuhltyp !== 0).length;

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

async function fetchFilteredEntriesUnpaginated(
  query: string
): Promise<Entry[]> {
  noStore();

  try {
    const entries = await fetchEntries();

    const filteredEntries = entries.filter(entry => {
      return (
        entry.anmerkungen.indexOf(query) >= 0 ||
        entry.motivation.indexOf(query) >= 0 ||
        entry.beschwerden.indexOf(query) >= 0 ||
        entry.datum.indexOf(query) >= 0 ||
        entry.getraenke.indexOf(query) >= 0 ||
        entry.ort.indexOf(query) >= 0 ||
        entry.speisen.indexOf(query) >= 0 ||
        entry.stuhltyp.toString() === query ||
        entry.stuhlverhalten.indexOf(query) >= 0 ||
        entry.therapie.indexOf(query) >= 0 ||
        entry.uhrzeit.indexOf(query) >= 0
      );
    });
    return filteredEntries;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredEntries(query: string, currentPage: number) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const filteredEntries = await fetchFilteredEntriesUnpaginated(query);

    return filteredEntries.slice(offset, offset + ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchEntriesPages(query: string) {
  noStore();
  try {
    const entries = await fetchFilteredEntriesUnpaginated(query);

    const totalPages = Math.ceil(Number(entries.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of entries.");
  }
}

export async function fetchEntryById(id: string) {
  noStore();
  try {
    const entries = (await fetchEntries()).filter(entry => entry.id === id);
    if (entries.length === 0) {
      return null;
    }
    return entries[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch entry.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = "pending" THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = "paid" THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map(customer => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid)
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function writeEntries(entries: Entry[]): Promise<void> {
  try {
    const content = stringify(entries, {
      header: true,
      columns: {
        id: "id",
        datum: "datum",
        uhrzeit: "uhrzeit",
        ort: "ort",
        motivation: "motivation",
        speisen: "speisen",
        getraenke: "getraenke",
        beschwerden: "beschwerden",
        stuhltyp: "stuhltyp",
        stuhlverhalten: "stuhlverhalten",
        therapie: "therapie",
        anmerkungen: "anmerkungen"
      }
    });

    return fs.writeFile(ENTRIES_CSV, content, {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });
  } catch (error) {
    console.error("Failed to write entries:", error);
    throw new Error("Failed to write entries.");
  }
}

export async function fetchLatestEntries(): Promise<Entry[]> {
  const allEntries = await fetchEntries();
  return allEntries.slice(0, 5);
}

export async function fetchEntries(): Promise<Entry[]> {
  let content = "";
  try {
    content = await fs.readFile(ENTRIES_CSV, "utf-8");
  } catch (err) {
    return [];
  }

  try {
    return new Promise((resolve, reject) => {
      parse(
        content,
        { columns: true, trim: true },
        (err: Error, rows: Entry[]) => {
          if (err) {
            reject(err);
          }
          const entries = rows.sort((a, b) => {
            if (a.datum > b.datum) {
              return -1;
            } else if (a.datum < b.datum) {
              return 1;
            } else {
              return a.uhrzeit > b.uhrzeit ? -1 : 1;
            }
          });
          resolve(entries);
        }
      );
    });
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    throw new Error("Failed to fetch entries.");
  }
}
