-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Loading',
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "originLat" REAL NOT NULL,
    "originLng" REAL NOT NULL,
    "destLat" REAL NOT NULL,
    "destLng" REAL NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0,
    "temp" TEXT NOT NULL DEFAULT '20.0°C',
    "humidity" TEXT NOT NULL DEFAULT '60%',
    "eta" TEXT NOT NULL DEFAULT 'TBD',
    "lastUpdate" TEXT NOT NULL DEFAULT 'Just now',
    "driver" TEXT NOT NULL,
    "driverPhone" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "securityHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BatchHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "batchId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    CONSTRAINT "BatchHistory_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GrowthData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT NOT NULL,
    "momentum" REAL NOT NULL,
    "health" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "BatchMomentum" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "batchId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "momentum" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BatchMomentum_batchId_key" ON "BatchMomentum"("batchId");
