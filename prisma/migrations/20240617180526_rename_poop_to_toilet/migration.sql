/*
  Warnings:

  - You are about to drop the `Poop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Poop";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Toilet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL,
    "stuhltyp" INTEGER NOT NULL,
    "stuhlverhalten" TEXT NOT NULL,
    "therapie" TEXT NOT NULL
);
