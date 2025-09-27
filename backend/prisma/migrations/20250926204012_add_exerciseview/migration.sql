-- CreateEnum
CREATE TYPE "ViewContext" AS ENUM ('LEARNING', 'STUDY_PLAN');

-- CreateTable
CREATE TABLE "ExerciseView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "context" "ViewContext" NOT NULL,
    "sessionId" TEXT,
    "answered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExerciseView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExerciseView_userId_viewedAt_idx" ON "ExerciseView"("userId", "viewedAt");

-- CreateIndex
CREATE INDEX "ExerciseView_exerciseId_idx" ON "ExerciseView"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseView_userId_exerciseId_sessionId_key" ON "ExerciseView"("userId", "exerciseId", "sessionId");

-- AddForeignKey
ALTER TABLE "ExerciseView" ADD CONSTRAINT "ExerciseView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseView" ADD CONSTRAINT "ExerciseView_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
