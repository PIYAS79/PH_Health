/*
  Warnings:

  - You are about to drop the `doctor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."doctor" DROP CONSTRAINT "doctor_email_fkey";

-- DropTable
DROP TABLE "public"."doctor";

-- CreateTable
CREATE TABLE "public"."patients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_photo" TEXT,
    "contact_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "reg_number" TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "gender" "public"."Gender" NOT NULL,
    "appointment_fee" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL,
    "current_working_place" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_id_key" ON "public"."patients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "public"."patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "public"."doctors"("email");

-- AddForeignKey
ALTER TABLE "public"."patients" ADD CONSTRAINT "patients_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doctors" ADD CONSTRAINT "doctors_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
