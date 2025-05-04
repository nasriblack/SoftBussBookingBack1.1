import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const whiteListUser = await prisma.whiteListUser.createMany({
    data: [
      { email: "john@example1.com" },
      { email: "john@example2.com" },
      { email: "john@example3.com" },
    ],
  });
  const bus = await prisma.bus.create({
    data: {
      name: "Express 101",
      destination: "Downtown",
      seats: {
        create: [
          { number: 1 },
          { number: 2 },
          { number: 3 },
          { number: 4 },
          { number: 5 },
        ],
      },
    },
    include: {
      seats: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      isVerified: true,
      reservations: {
        create: {
          seat: {
            connect: {
              id: bus.seats[0].id, // Seat 1
            },
          },
        },
      },
    },
  });

  console.log("✅ Nested seeding complete");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
