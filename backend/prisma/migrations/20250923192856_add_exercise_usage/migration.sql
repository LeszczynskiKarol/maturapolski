-- CreateEnum
CREATE TYPE "UsageContext" AS ENUM ('LEARNING', 'EXAM', 'STUDY_PLAN');

-- CreateTable
CREATE TABLE "ExerciseUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usageCount" INTEGER NOT NULL DEFAULT 1,
    "context" "UsageContext" NOT NULL,

    CONSTRAINT "ExerciseUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExerciseUsage_userId_lastUsedAt_idx" ON "ExerciseUsage"("userId", "lastUsedAt");

-- CreateIndex
CREATE INDEX "ExerciseUsage_exerciseId_idx" ON "ExerciseUsage"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseUsage_userId_exerciseId_key" ON "ExerciseUsage"("userId", "exerciseId");

-- AddForeignKey
ALTER TABLE "ExerciseUsage" ADD CONSTRAINT "ExerciseUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseUsage" ADD CONSTRAINT "ExerciseUsage_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
