import { NextFunction, Response, Request } from "express";
import * as adminService from "../services/admin.service";
import {
  sendBadRequestResponse,
  sendNotFoundResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import HttpStatusCode from "../utils/httpStatusCode";

export const checkExistingUserWhiteList = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = Number(request.params.id);
    const isUserExist = await adminService.CheckIfWhiteListUserExist(userId);
    if (!isUserExist) {
      return sendNotFoundResponse(response, "User Not Found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// BY USERID
export const checkExistingUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = request.body.userId;
    const isUserExist = await adminService.CheckIfUserExist(userId);
    if (!isUserExist) {
      return sendNotFoundResponse(response, "User Not Found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const checkVerifiedUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = request.body.userId;
    const isVerifiedUser = await adminService.CheckIfVerifiedUser(userId);
    if (!isVerifiedUser) {
      return sendNotFoundResponse(response, "This user is not verified");
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const AddUserInWhiteLIst = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const user = request.body;
  const addUserInList = await adminService.AddUserInWhiteList(user);
  return sendSuccessResponse(response, addUserInList, HttpStatusCode.CREATED);
};

export const ListAllUserInWhiteList = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const usersWhiteList = await adminService.ListAllUserInWhiteList();
  return sendSuccessResponse(response, usersWhiteList, HttpStatusCode.OK);
};

export const DeleteUserInWhiteList = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = Number(request.params.id);
    await adminService.DeleteUserInWhiteList(userId);
    return sendSuccessResponse(response, "User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const GetReservationListController = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const reservationList = await adminService.GetReservationList();
    return sendSuccessResponse(response, reservationList, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};

export const UpdateVerificationUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userPayload = request.body;

    await adminService.UpdateVerificationUser(userPayload);
    return sendSuccessResponse(response, [], HttpStatusCode.ACCEPTED);
  } catch (error) {
    next(error);
  }
};

export const checkExistingUserByEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const email = request.body.email;
    if (!email) {
      return sendBadRequestResponse(response, "email is required");
    }
    const isUserExist = await adminService.checkIfUserExistByEmail(email);
    if (isUserExist) {
      return sendNotFoundResponse(response, "User Already Exist");
    }
    next();
  } catch (error) {
    next(error);
  }
};
