import { Destination, Reservation } from "@prisma/client";
import { prismaClient } from "../utils/prisma";
import { todayEnd, todayStart } from "../utils/const";
import generateToken from "../utils/token";
import bcrypt from "bcryptjs";
import { checkIfUserExistByEmail } from "./admin.service";

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
      reservedAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    select: {
      destination: true,
      seat: true,
      userId: true,
      reservedAt: true,
      id: true,
      isCanceled: true,
      updatedAt: true,
    },
  });
};
export const checkUserSeat = async (
  userId: string
): Promise<Reservation | null> => {
  return prismaClient.reservation.findFirst({
    where: {
      userId: userId,
      reservedAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    select: {
      destination: true,
      seat: true,
      userId: true,
      reservedAt: true,
      id: true,
      isCanceled: true,
      updatedAt: true,
    },
  });
};

export const getTodayBookingList = async (
  destination: Destination
): Promise<Reservation[]> => {
  return prismaClient.reservation.findMany({
    where: {
      reservedAt: {
        gte: todayStart,
        lte: todayEnd,
      },
      destination: {
        equals: destination,
      },
    },
    select: {
      id: true,
      reservedAt: true,
      destination: true,
      seat: true,
      userId: true,
      isCanceled: true,
      updatedAt: true,

      user: {
        select: {
          email: true,
        },
      },
    },
  });
};

export const cancelMyReservation = async (
  payloadReservartion: any
): Promise<any> => {
  return prismaClient.reservation.update({
    where: {
      id: payloadReservartion.id,
      userId: payloadReservartion.userId,
      reservedAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    data: {
      isCanceled: payloadReservartion.isCanceled,
    },
  });
};

export const createUserService = async (payloadUser: any): Promise<any> => {
  const hashedPassword = await bcrypt.hash(payloadUser.password, 10);
  const user = prismaClient.user.create({
    data: {
      email: payloadUser.email,
      password: hashedPassword,
    },
    select: {
      email: true,
      role: true,
      isVerified: true,
    },
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const loginUserService = async (payloadUser: any): Promise<any> => {
  const emailPayload = payloadUser.email?.trim();
  const passwordPayload = payloadUser.password?.trim();

  const user = await checkIfUserExistByEmail(emailPayload);

  const match = await bcrypt.compare(passwordPayload, user.password);
  if (match) {
    return {
      email: user.email,
      token: generateToken(user),
    };
  }
  return null;
};
