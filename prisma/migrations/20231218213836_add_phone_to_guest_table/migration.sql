/*
  Warnings:

  - Added the required column `phone` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Guest_email_key";

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "phone" TEXT NOT NULL;
