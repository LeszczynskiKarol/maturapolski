-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('EPOCH_OVERVIEW', 'WORK_ANALYSIS', 'CHARACTER_ANALYSIS', 'THEME_ANALYSIS', 'WRITING_GUIDE', 'THEORY', 'SUMMARY', 'INTERPRETATION', 'CONTEXT', 'BIOGRAPHY');

-- CreateEnum
CREATE TYPE "MaterialCategory" AS ENUM ('EPOCHS', 'LITERATURE', 'THEORY', 'WRITING', 'EXAM_PREP', 'QUICK_REVIEW');

-- CreateEnum
CREATE TYPE "AnalysisType" AS ENUM ('THEMES', 'SYMBOLS', 'STYLE', 'INTERPRETATION', 'CONTEXT', 'COMPARISON');

-- CreateTable
CREATE TABLE "LiteraryWork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "epoch" "LiteraryEpoch" NOT NULL,
    "genre" TEXT NOT NULL,
    "year" INTEGER,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "summary" TEXT,
    "themes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiteraryWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keyEvents" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "traits" TEXT[],
    "evolution" TEXT,
    "quotes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "context" TEXT,
    "character" TEXT,
    "chapter" INTEGER,
    "significance" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "AnalysisType" NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "MaterialType" NOT NULL,
    "category" "MaterialCategory" NOT NULL,
    "content" JSONB NOT NULL,
    "summary" TEXT,
    "epoch" "LiteraryEpoch",
    "workId" TEXT,
    "tags" TEXT[],
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "readingTime" INTEGER,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL DEFAULT 0,
    "author" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpochInfo" (
    "id" TEXT NOT NULL,
    "epoch" "LiteraryEpoch" NOT NULL,
    "name" TEXT NOT NULL,
    "namePolish" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "characteristics" TEXT[],
    "philosophy" TEXT NOT NULL,
    "artStyle" TEXT NOT NULL,
    "mainGenres" TEXT[],
    "keyAuthors" TEXT[],
    "keyWorks" TEXT[],
    "historicalContext" TEXT NOT NULL,
    "timeline" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EpochInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiteraryTerm" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "examples" TEXT[],
    "relatedTerms" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiteraryTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssayTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "structure" JSONB NOT NULL,
    "tips" TEXT[],
    "examples" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssayTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMaterialProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "lastAccessed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMaterialProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_workId_number_key" ON "Chapter"("workId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Material_slug_key" ON "Material"("slug");

-- CreateIndex
CREATE INDEX "Material_slug_idx" ON "Material"("slug");

-- CreateIndex
CREATE INDEX "Material_category_epoch_idx" ON "Material"("category", "epoch");

-- CreateIndex
CREATE INDEX "Material_isPublished_isPremium_idx" ON "Material"("isPublished", "isPremium");

-- CreateIndex
CREATE UNIQUE INDEX "EpochInfo_epoch_key" ON "EpochInfo"("epoch");

-- CreateIndex
CREATE UNIQUE INDEX "LiteraryTerm_term_key" ON "LiteraryTerm"("term");

-- CreateIndex
CREATE INDEX "LiteraryTerm_category_idx" ON "LiteraryTerm"("category");

-- CreateIndex
CREATE INDEX "UserMaterialProgress_userId_idx" ON "UserMaterialProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMaterialProgress_userId_materialId_key" ON "UserMaterialProgress"("userId", "materialId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_workId_fkey" FOREIGN KEY ("workId") REFERENCES "LiteraryWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_workId_fkey" FOREIGN KEY ("workId") REFERENCES "LiteraryWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_workId_fkey" FOREIGN KEY ("workId") REFERENCES "LiteraryWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_workId_fkey" FOREIGN KEY ("workId") REFERENCES "LiteraryWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_workId_fkey" FOREIGN KEY ("workId") REFERENCES "LiteraryWork"("id") ON DELETE SET NULL ON UPDATE CASCADE;
