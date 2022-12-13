-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ooblet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "itemAmount" INTEGER
);
INSERT INTO "new_Ooblet" ("desc", "id", "itemAmount", "name") SELECT "desc", "id", "itemAmount", "name" FROM "Ooblet";
DROP TABLE "Ooblet";
ALTER TABLE "new_Ooblet" RENAME TO "Ooblet";
CREATE UNIQUE INDEX "Ooblet_name_key" ON "Ooblet"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
