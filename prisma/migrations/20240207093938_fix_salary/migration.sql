/*
  Warnings:

  - You are about to drop the column `salary` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL DEFAULT 10.0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "salary";
