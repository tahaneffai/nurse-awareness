-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnonymousVoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "topicTags" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Copy existing data, set status to APPROVED for existing rows, and set updatedAt to createdAt
INSERT INTO "new_AnonymousVoice" ("id", "message", "topicTags", "status", "createdAt", "updatedAt")
SELECT 
    "id", 
    "message", 
    "topicTags", 
    COALESCE("status", "APPROVED") as "status",
    "createdAt",
    "createdAt" as "updatedAt"
FROM "AnonymousVoice";
DROP TABLE "AnonymousVoice";
ALTER TABLE "new_AnonymousVoice" RENAME TO "AnonymousVoice";
CREATE INDEX "AnonymousVoice_createdAt_idx" ON "AnonymousVoice"("createdAt");
CREATE INDEX "AnonymousVoice_status_idx" ON "AnonymousVoice"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
