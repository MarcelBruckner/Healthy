-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datetime" DATETIME NOT NULL,
    "ort" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "speisen" TEXT NOT NULL,
    "getraenke" TEXT NOT NULL,
    "beschwerden" TEXT NOT NULL,
    "stuhltyp" INTEGER NOT NULL,
    "stuhlverhalten" TEXT NOT NULL,
    "therapie" TEXT NOT NULL,
    "anmerkungen" TEXT NOT NULL
);
