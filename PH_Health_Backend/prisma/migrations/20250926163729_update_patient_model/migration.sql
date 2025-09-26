/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."patients" DROP COLUMN "contactNumber",
DROP COLUMN "profilePhoto",
ADD COLUMN     "contact_number" TEXT,
ADD COLUMN     "profile_photo" TEXT;
