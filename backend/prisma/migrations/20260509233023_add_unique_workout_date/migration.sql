/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Workout_date_key" ON "Workout"("date");
