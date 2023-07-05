/*
  Warnings:

  - You are about to drop the column `date` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "date",
ALTER COLUMN "image" DROP NOT NULL;
