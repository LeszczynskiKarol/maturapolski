-- AlterTable
ALTER TABLE "ContentPage" ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "ratingsCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PageRating" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "userId" TEXT,
    "ipAddress" TEXT,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageRating_pageId_idx" ON "PageRating"("pageId");

-- CreateIndex
CREATE INDEX "PageRating_ipAddress_idx" ON "PageRating"("ipAddress");

-- AddForeignKey
ALTER TABLE "PageRating" ADD CONSTRAINT "PageRating_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ContentPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
