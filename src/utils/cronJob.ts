import nodeCron from "node-cron";
import { prismaClient } from "./prisma";
export const cronJobDeleteReservation = () => {
  nodeCron.schedule("0 0 * * *", async () => {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const deleted = await prismaClient.reservation.deleteMany({
        where: {
          reservedAt: {
            lt: oneMonthAgo,
          },
        },
      });

      console.log(`Deleted ${deleted.count} records older than one month.`);
    } catch (error) {
      console.error("Error running cron job:", error);
    }
  });
};
