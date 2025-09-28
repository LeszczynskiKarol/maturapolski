-- CreateTable
CREATE TABLE "UserLevelProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "unlockedDifficulty" INTEGER NOT NULL DEFAULT 2,
    "difficulty1Points" INTEGER NOT NULL DEFAULT 0,
    "difficulty2Points" INTEGER NOT NULL DEFAULT 0,
    "difficulty3Points" INTEGER NOT NULL DEFAULT 0,
    "difficulty4Points" INTEGER NOT NULL DEFAULT 0,
    "difficulty5Points" INTEGER NOT NULL DEFAULT 0,
    "pointsToUnlock3" INTEGER NOT NULL DEFAULT 100,
    "pointsToUnlock4" INTEGER NOT NULL DEFAULT 200,
    "pointsToUnlock5" INTEGER NOT NULL DEFAULT 300,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLevelProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLevelProgress_userId_key" ON "UserLevelProgress"("userId");

-- AddForeignKey
ALTER TABLE "UserLevelProgress" ADD CONSTRAINT "UserLevelProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
