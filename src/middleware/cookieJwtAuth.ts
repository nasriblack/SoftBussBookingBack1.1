import { NextFunction, Request, Response } from "express";
import { sendUnauthorizedResponse } from "../utils/responseHandler";
import { verifyToken } from "../utils/token";

import * as adminService from "../services/admin.service";

const protectAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const allCookies = request.cookies;
  const token = allCookies.jwt;
  if (token) {
    try {
      const decoded: any = verifyToken(token);

      const authUser = await adminService.CheckIfUserExist(decoded.user.id);

      if (authUser) {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  } else {
    return sendUnauthorizedResponse(
      response,
      "Unauthorized - you need to login"
    );
  }
};

export { protectAuth };
