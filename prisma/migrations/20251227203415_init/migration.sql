-- CreateTable
CREATE TABLE "AnonymousVoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "topicTags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'APPROVED'
);

-- CreateIndex
CREATE INDEX "AnonymousVoice_createdAt_idx" ON "AnonymousVoice"("createdAt");

-- CreateIndex
CREATE INDEX "AnonymousVoice_status_idx" ON "AnonymousVoice"("status");
