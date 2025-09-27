-- AlterTable
ALTER TABLE "LearningSession" ADD COLUMN     "isWeekPlan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weekNumber" INTEGER;

-- AlterTable
ALTER TABLE "WeeklyProgress" ADD COLUMN     "completedExercises" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sessionsCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sessionsRequired" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "targetExercises" INTEGER NOT NULL DEFAULT 70;

-- CreateIndex
CREATE INDEX "LearningSession_userId_weekNumber_idx" ON "LearningSession"("userId", "weekNumber");
