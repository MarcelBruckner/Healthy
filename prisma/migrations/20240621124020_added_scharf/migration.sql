/*
  Warnings:

  - Added the required column `scharf` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL,
    "ort" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "speisen" TEXT NOT NULL,
    "scharf" INTEGER NOT NULL,
    "getraenke" TEXT NOT NULL,
    "beschwerden" TEXT NOT NULL,
    "anmerkungen" TEXT NOT NULL
);
INSERT INTO "new_Food" ("anmerkungen", "beschwerden", "datetime", "getraenke", "id", "motivation", "ort", "speisen") SELECT "anmerkungen", "beschwerden", "datetime", "getraenke", "id", "motivation", "ort", "speisen" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
