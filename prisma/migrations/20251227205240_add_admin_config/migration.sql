-- CreateTable
CREATE TABLE "AdminConfig" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "passwordHash" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
