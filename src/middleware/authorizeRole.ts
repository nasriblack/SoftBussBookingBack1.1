import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import * as adminService from "../services/admin.service";
import { sendBadRequestResponse } from "../utils/responseHandler";

// Higher-order function that returns the middleware
export const authorizeRole = (roles: string[]) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const allCookies = request.cookies;
    const token = allCookies.jwt;

    if (!token) {
      return sendBadRequestResponse(response, "No token provided");
    }

    try {
      const decoded: any = verifyToken(token);
      const authUser = await adminService.CheckIfUserExist(decoded.user.id);
      console.log("checking the authUser", authUser);
      if (!authUser || !roles.includes(authUser.role)) {
        return sendBadRequestResponse(response, "Access denied");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
