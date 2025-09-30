-- CreateTable
CREATE TABLE "PointsPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "pointsAmount" INTEGER NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PointsPurchase_stripeSessionId_key" ON "PointsPurchase"("stripeSessionId");

-- CreateIndex
CREATE INDEX "PointsPurchase_userId_createdAt_idx" ON "PointsPurchase"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PointsPurchase_subscriptionId_idx" ON "PointsPurchase"("subscriptionId");

-- AddForeignKey
ALTER TABLE "PointsPurchase" ADD CONSTRAINT "PointsPurchase_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
