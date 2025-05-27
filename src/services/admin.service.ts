import { prismaClient } from "../utils/prisma";
import { IListWhiteUser } from "../models/IListWhiteUser";
import { Reservation, User } from "@prisma/client";
import { oneMonthAgo } from "../utils/const";

export const AddUserInWhiteList = async (
  user: any
): Promise<IListWhiteUser> => {
  return prismaClient.whiteListUser.create({
    data: {
      email: user.email,
    },
    select: {
      email: true,
      id: true,
    },
  });
};

export const ListAllUserInWhiteList = async (): Promise<IListWhiteUser[]> => {
  return prismaClient.whiteListUser.findMany({
    select: {
      email: true,
      id: true,
    },
  });
};

export const DeleteUserInWhiteList = async (
  userId: number
): Promise<IListWhiteUser> => {
  return prismaClient.whiteListUser.delete({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
    },
  });
};

export const CheckIfWhiteListUserExist = async (
  userId: number
): Promise<IListWhiteUser | null> => {
  return prismaClient.whiteListUser.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
    },
  });
};
export const CheckIfUserExist = async (userId: string): Promise<any | null> => {
  return prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
      isVerified: true,
      reservations: true,
      role: true,
    },
  });
};
export const CheckIfVerifiedUser = async (
  userId: string
): Promise<any | null> => {
  return prismaClient.user.findUnique({
    where: {
      id: userId,
      isVerified: true,
    },
    select: {
      email: true,
      id: true,
      isVerified: true,
      reservations: true,
      role: true,
    },
  });
};

export const GetReservationList = async (): Promise<Reservation[]> => {
  return prismaClient.reservation.findMany({
    where: {
      reservedAt: {
        gte: oneMonthAgo,
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

export const UpdateVerificationUser = async (user: any): Promise<User> => {
  return prismaClient.user.update({
    where: {
      id: user.userId,
    },
    data: {
      isVerified: user.isVerified,
    },
  });
};
