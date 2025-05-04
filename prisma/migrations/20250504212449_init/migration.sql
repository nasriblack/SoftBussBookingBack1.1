-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteListUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "WhiteListUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "busId" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "seatId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "reservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteListUser_email_key" ON "WhiteListUser"("email");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
