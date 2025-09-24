-- CreateTable
CREATE TABLE "TextSource" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "tytul" TEXT NOT NULL,
    "fragment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TextSource_examId_idx" ON "TextSource"("examId");

-- AddForeignKey
ALTER TABLE "TextSource" ADD CONSTRAINT "TextSource_examId_fkey" FOREIGN KEY ("examId") REFERENCES "MockExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
