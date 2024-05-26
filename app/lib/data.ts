import { sql } from "@vercel/postgres";
import { CustomersTableType, User, Customer, Entry } from "./definitions";
import { formatCurrency } from "./utils";
import fs from "node:fs";
import { unstable_noStore as noStore } from "next/cache";
import { parse, stringify } from "csv";

export function readJsonFile(path: string) {
  const fileContent = fs.readFileSync(path, "utf8");
  var values = JSON.parse(fileContent);
  // console.log(values);
  return values;
}

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: "no-store"}).
  noStore();

  try {
    return readJsonFile("./app/lib/revenue.json");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: "no-store"}).
  noStore();

  try {
    return readJsonFile("./app/lib/customers.json");
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

async function fetchFilteredEntriesUnpaginated(query: string) {
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
    return new Promise((resolve, reject) => {
      stringify(
        entries,
        {
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
        },
        (err: Error | undefined, output: string) => {
          if (err) {
            throw err;
          }
          fs.writeFile("./app/lib/entries.csv", output, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      );
    });
  } catch (error) {
    console.error("Failed to write entries:", error);
    throw new Error("Failed to write entries.");
  }
}

export async function fetchLatestEntries(): Promise<Entry[]> {
  return (await fetchEntries()).slice(0, 5);
}

export async function fetchEntries(): Promise<Entry[]> {
  try {
    return new Promise((resolve, reject) => {
      const entries: Entry[] = [];
      fs.createReadStream("./app/lib/entries.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", row => {
          const entry: Entry = {
            id: row[0],
            datum: row[1],
            uhrzeit: row[2],
            ort: row[3],
            motivation: row[4],
            speisen: row[5],
            getraenke: row[6],
            beschwerden: row[7],
            stuhltyp: row[8],
            stuhlverhalten: row[9],
            therapie: row[10],
            anmerkungen: row[11]
          };
          entries.push(entry);
        })
        .on("end", function () {
          console.log("finished");
          resolve(
            entries.sort((a, b) => {
              if (a.datum > b.datum) {
                return -1;
              } else if (a.datum < b.datum) {
                return 1;
              } else {
                return a.uhrzeit > b.uhrzeit ? -1 : 1;
              }
            })
          );
        })
        .on("error", function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    throw new Error("Failed to fetch entries.");
  }
}
