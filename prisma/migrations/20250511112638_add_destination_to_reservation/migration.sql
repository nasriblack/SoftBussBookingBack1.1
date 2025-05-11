/*
  Warnings:

  - The `destination` column on the `Bus` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "destination",
ADD COLUMN     "destination" "Destination" NOT NULL DEFAULT 'NABEUL';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "destination" "Destination" NOT NULL DEFAULT 'NABEUL';
