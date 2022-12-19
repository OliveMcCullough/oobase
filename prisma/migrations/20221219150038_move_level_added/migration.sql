/*
  Warnings:

  - Made the column `level` on table `Move` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Move" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "oobletID" INTEGER NOT NULL,
    CONSTRAINT "Move_oobletID_fkey" FOREIGN KEY ("oobletID") REFERENCES "Ooblet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Move" ("cost", "desc", "id", "level", "name", "oobletID") SELECT "cost", "desc", "id", "level", "name", "oobletID" FROM "Move";
DROP TABLE "Move";
ALTER TABLE "new_Move" RENAME TO "Move";
CREATE UNIQUE INDEX "Move_name_key" ON "Move"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
