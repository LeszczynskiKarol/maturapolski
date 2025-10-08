-- CreateEnum
CREATE TYPE "HubType" AS ENUM ('LITERARY_WORK', 'EPOCH', 'AUTHOR', 'THEME', 'GENRE');

-- CreateTable
CREATE TABLE "ContentHub" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "HubType" NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "author" TEXT,
    "year" INTEGER,
    "genre" TEXT,
    "epoch" "LiteraryEpoch",
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "birthYear" INTEGER,
    "deathYear" INTEGER,
    "period" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentHub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentPage" (
    "id" TEXT NOT NULL,
    "hubId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "readingTime" INTEGER,
    "views" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentHub_slug_key" ON "ContentHub"("slug");

-- CreateIndex
CREATE INDEX "ContentHub_type_isPublished_idx" ON "ContentHub"("type", "isPublished");

-- CreateIndex
CREATE INDEX "ContentHub_slug_idx" ON "ContentHub"("slug");

-- CreateIndex
CREATE INDEX "ContentPage_hubId_order_idx" ON "ContentPage"("hubId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ContentPage_hubId_slug_key" ON "ContentPage"("hubId", "slug");

-- AddForeignKey
ALTER TABLE "ContentPage" ADD CONSTRAINT "ContentPage_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "ContentHub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
