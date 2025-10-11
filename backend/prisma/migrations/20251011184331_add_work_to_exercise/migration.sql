-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "work" TEXT;

-- CreateIndex
CREATE INDEX "Exercise_work_idx" ON "Exercise"("work");

-- CreateIndex
CREATE INDEX "Exercise_category_work_idx" ON "Exercise"("category", "work");
