import { prismaClient } from "./../src/utils/prisma";

async function deleteDatabase() {
  // Delete in proper order to avoid FK constraint violations
  await prismaClient.reservation.deleteMany();
  await prismaClient.bus.deleteMany();
  await prismaClient.user.deleteMany();
  await prismaClient.whiteListUser.deleteMany();
}

deleteDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
