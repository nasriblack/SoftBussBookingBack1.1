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

export const checkSeatStatus = async (
  seatId: string
): Promise<Reservation | null> => {
  return prismaClient.reservation.findFirst({
    where: {
      seat: seatId,
    },
    select: {
      destination: true,
      seat: true,
      userId: true,
      reservedAt: true,
      id: true,
    },
  });
};
export const checkUserSeat = async (
  userId: string
): Promise<Reservation | null> => {
  return prismaClient.reservation.findFirst({
    where: {
      userId: userId,
    },
    select: {
      destination: true,
      seat: true,
      userId: true,
      reservedAt: true,
      id: true,
    },
  });
};
