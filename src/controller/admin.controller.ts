import { NextFunction, Response, Request } from "express";
import * as adminService from "../services/admin.service";
import { sendSuccessResponse } from "../utils/responseHandler";
import HttpStatusCode from "../utils/httpStatusCode";

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
