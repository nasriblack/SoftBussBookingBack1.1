import { Destination, Reservation } from "@prisma/client";
import { prismaClient } from "../utils/prisma";

export const createReservation = async (
  reservationPayload: any
  //     : {
  //   userId: string;
  //   destination: Destination;
  //   seat: string;
  // }
): Promise<Reservation> => {
  return prismaClient.reservation.create({
    data: {
      seat: reservationPayload.seat,
      userId: reservationPayload.userId,
      destination: reservationPayload.destination,
    },
  });
};
