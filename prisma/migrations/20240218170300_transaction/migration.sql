-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('OUTCOME', 'INCOME');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL DEFAULT 'INCOME',
    "amount" DOUBLE PRECISION NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
