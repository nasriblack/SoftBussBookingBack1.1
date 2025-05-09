import { prismaClient } from "../utils/prisma";
import { IListWhiteUser } from "../models/IListWhiteUser";

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

export const CheckIfUserExist = async (
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
