/*
  Warnings:

  - A unique constraint covering the columns `[seatId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Destination" AS ENUM ('NABEUL', 'BIZERT');

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_seatId_key" ON "Reservation"("seatId");
