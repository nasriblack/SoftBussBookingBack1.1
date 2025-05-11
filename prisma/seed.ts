import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1. Create Users
  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      isVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane.smith@example.com",
      isVerified: false,
    },
  });

  // 2. Whitelist User
  await prisma.whiteListUser.createMany({
    data: [
      { email: "allowed.user1@example.com" },
      { email: "allowed.user2@example.com" },
    ],
  });

  // 3. Create Buses
  const busA = await prisma.bus.create({
    data: {
      name: "Bus A",
      destination: "NABEUL",
    },
  });

  const busB = await prisma.bus.create({
    data: {
      name: "Bus B",
      destination: "BIZERT",
    },
  });

  // 4. Create Seats for each bus
  const seatsA = await prisma.seat.createMany({
    data: [
      { number: 1, busId: busA.id },
      { number: 2, busId: busA.id },
    ],
  });

  const seatsB = await prisma.seat.createMany({
    data: [
      { number: 1, busId: busB.id },
      { number: 2, busId: busB.id },
    ],
  });

  // 5. Create Reservations
  const seatA1 = await prisma.seat.findFirst({
    where: { busId: busA.id, number: 1 },
  });
  const seatB2 = await prisma.seat.findFirst({
    where: { busId: busB.id, number: 2 },
  });

  if (seatA1 && seatB2) {
    await prisma.reservation.createMany({
      data: [
        {
          userId: user1.id,
          seatId: seatA1.id,
          destination: "NABEUL",
        },
        {
          userId: user2.id,
          seatId: seatB2.id,
          destination: "BIZERT",
        },
      ],
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
