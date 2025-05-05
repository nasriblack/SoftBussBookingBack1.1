import express, { NextFunction, Router, type Express } from "express";
import * as userWhiteList from "../services/whiteUserList.service";

export const AddUserInWhiteLIst = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const user = request.body;
  const addUserInList = await userWhiteList.AddUserInWhiteList(user);
};
