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
