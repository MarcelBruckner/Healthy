/*
  Warnings:

  - You are about to drop the column `stuhlverhalten` on the `Toilet` table. All the data in the column will be lost.
  - Added the required column `anmerkungen` to the `Toilet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stuhldruck` to the `Toilet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stuhlfarbe` to the `Toilet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stuhlmenge` to the `Toilet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urindruck` to the `Toilet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urinmenge` to the `Toilet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Toilet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL,
    "urinmenge" INTEGER NOT NULL,
    "urindruck" INTEGER NOT NULL,
    "stuhltyp" INTEGER NOT NULL,
    "stuhlfarbe" INTEGER NOT NULL,
    "stuhlmenge" INTEGER NOT NULL,
    "stuhldruck" INTEGER NOT NULL,
    "therapie" TEXT NOT NULL,
    "anmerkungen" TEXT NOT NULL
);
INSERT INTO "new_Toilet" ("datetime", "id", "stuhltyp", "therapie") SELECT "datetime", "id", "stuhltyp", "therapie" FROM "Toilet";
DROP TABLE "Toilet";
ALTER TABLE "new_Toilet" RENAME TO "Toilet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
