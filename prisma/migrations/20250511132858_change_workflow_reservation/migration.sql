/*
  Warnings:

  - You are about to drop the column `seatId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[seat]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seat` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_seatId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_busId_fkey";

-- DropIndex
DROP INDEX "Reservation_seatId_key";

-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "seatsNumber" INTEGER NOT NULL DEFAULT 29;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "seatId",
ADD COLUMN     "seat" TEXT NOT NULL;

-- DropTable
DROP TABLE "Seat";

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_seat_key" ON "Reservation"("seat");
