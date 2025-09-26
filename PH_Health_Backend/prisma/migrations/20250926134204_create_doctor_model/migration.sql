-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "public"."doctor" (
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

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_email_key" ON "public"."doctor"("email");

-- AddForeignKey
ALTER TABLE "public"."doctor" ADD CONSTRAINT "doctor_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
