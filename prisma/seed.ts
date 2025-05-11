import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
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

  // Seed Buses
  const bus1 = await prisma.bus.create({
    data: {
      name: "Bus to Nabeul",
      destination: "NABEUL",
      seatsNumber: 4,
    },
  });

  const bus2 = await prisma.bus.create({
    data: {
      name: "Bus to Bizert",
      destination: "BIZERT",
      seatsNumber: 3,
    },
  });

  // Seed Reservations
  await prisma.reservation.createMany({
    data: [
      {
        userId: user1.id,
        seat: "SA1",
        destination: "NABEUL",
      },
      {
        userId: user2.id,
        seat: "SA2",
        destination: "NABEUL",
      },
    ],
  });

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
