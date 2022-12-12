-- CreateTable
CREATE TABLE "Ooblet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "itemAmount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "oobletID" INTEGER NOT NULL,
    CONSTRAINT "Item_oobletID_fkey" FOREIGN KEY ("oobletID") REFERENCES "Ooblet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Move" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "oobletID" INTEGER NOT NULL,
    CONSTRAINT "Move_oobletID_fkey" FOREIGN KEY ("oobletID") REFERENCES "Ooblet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OobletToRegion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OobletToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "Ooblet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OobletToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "Region" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ooblet_name_key" ON "Ooblet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_oobletID_key" ON "Item"("oobletID");

-- CreateIndex
CREATE UNIQUE INDEX "Move_name_key" ON "Move"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_OobletToRegion_AB_unique" ON "_OobletToRegion"("A", "B");

-- CreateIndex
CREATE INDEX "_OobletToRegion_B_index" ON "_OobletToRegion"("B");
