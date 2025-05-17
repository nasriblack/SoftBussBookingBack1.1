import { PrismaClient, Destination, Role } from "@prisma/client";
import { addDays, format } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean up existing data
  console.log("🧹 Cleaning up existing data...");
  await prisma.reservation.deleteMany({});
  await prisma.bus.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("✅ Database cleaned");

  // Create 1 admin user
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      isVerified: true,
      role: Role.ADMIN,
    },
  });
  console.log(`✅ Admin user created with ID: ${adminUser.id}`);

  // Create 65 regular users (60 verified, 5 unverified)
  const users: any = [];

  // Create 60 verified users
  for (let i = 1; i <= 60; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user.verified${i}@example.com`,
        isVerified: true,
        role: Role.USER,
      },
    });
    users.push(user);
  }
  console.log("✅ 60 verified users created");

  // Create 5 unverified users
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user.unverified${i}@example.com`,
        isVerified: false,
        role: Role.USER,
      },
    });
    users.push(user);
  }
  console.log("✅ 5 unverified users created");

  // Create buses
  const busNabeul = await prisma.bus.create({
    data: {
      name: "Bus to Nabeul",
      destination: Destination.NABEUL,
      seatsNumber: 29,
    },
  });

  const busBizert = await prisma.bus.create({
    data: {
      name: "Bus to Bizert",
      destination: Destination.BIZERT,
      seatsNumber: 29,
    },
  });
  console.log("✅ Buses created");

  // Get today's date
  const today = new Date();

  // Generate seat IDs for Nabeul and Bizert
  function generateSeatId(
    destination: Destination,
    dateObj: Date,
    seatNumber: number
  ): string {
    const formattedDate = format(dateObj, "yyyy-MM-dd");
    const prefix = destination === Destination.NABEUL ? "SN" : "SB";
    // Pad seat number with leading zero if less than 10
    const paddedSeatNum = seatNumber < 10 ? `0${seatNumber}` : `${seatNumber}`;

    return `${prefix}-${formattedDate}-${paddedSeatNum}`;
  }

  // Create reservations for past 5 days
  const reservationData: any = [];

  // For each of the past 5 days
  for (let day = 5; day >= 1; day--) {
    const reservationDate = addDays(today, -day);

    // Create some reservations for Nabeul (10 per day)
    for (let seat = 1; seat <= 10; seat++) {
      const userIndex = (day * 10 + seat) % users.length;
      reservationData.push({
        userId: users[userIndex].id,
        seat: generateSeatId(Destination.NABEUL, reservationDate, seat),
        destination: Destination.NABEUL,
        reservedAt: reservationDate,
      });
    }

    // Create some reservations for Bizert (8 per day)
    for (let seat = 1; seat <= 8; seat++) {
      const userIndex = (day * 8 + seat + 15) % users.length;
      reservationData.push({
        userId: users[userIndex].id,
        seat: generateSeatId(Destination.BIZERT, reservationDate, seat),
        destination: Destination.BIZERT,
        reservedAt: reservationDate,
      });
    }
  }

  // Create reservations for today
  // 20 for Nabeul
  for (let seat = 1; seat <= 20; seat++) {
    const userIndex = seat % users.length;
    reservationData.push({
      userId: users[userIndex].id,
      seat: generateSeatId(Destination.NABEUL, today, seat),
      destination: Destination.NABEUL,
      reservedAt: today,
    });
  }

  // 29 for Bizert (full bus)
  for (let seat = 1; seat <= 29; seat++) {
    const userIndex = (seat + 10) % users.length;
    reservationData.push({
      userId: users[userIndex].id,
      seat: generateSeatId(Destination.BIZERT, today, seat),
      destination: Destination.BIZERT,
      reservedAt: today,
    });
  }

  // Create all reservations at once
  await prisma.reservation.createMany({
    data: reservationData,
  });

  console.log(`✅ Created ${reservationData.length} reservations`);
  console.log("✅ Database seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
