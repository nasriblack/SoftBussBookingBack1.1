import { NextFunction, Response, Request } from "express";
import * as userWhiteList from "../services/admin.service";
import { sendSuccessResponse } from "../utils/responseHandler";
import HttpStatusCode from "../utils/httpStatusCode";

export const AddUserInWhiteLIst = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const user = request.body;
  const addUserInList = await userWhiteList.AddUserInWhiteList(user);
  return sendSuccessResponse(response, addUserInList, HttpStatusCode.CREATED);
};
