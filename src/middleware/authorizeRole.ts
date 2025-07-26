/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import * as adminService from "../services/admin.service";
import { sendUnauthorizedResponse } from "../utils/responseHandler";
import { Role } from "@prisma/client";

// Higher-order function that returns the middleware
export const authorizeRole = (roles: Role[]) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const allCookies = request.cookies;
    const token = allCookies.jwt;

    if (!token) {
      return sendUnauthorizedResponse(response, "No token provided");
    }

    try {
      const decoded: any = verifyToken(token);
      const authUser = await adminService.CheckIfUserExist(decoded.user.id);
      console.log("checking the authUser", authUser);
      if (!authUser || !roles.includes(authUser.role)) {
        return sendUnauthorizedResponse(response, "Access denied");
      }

      next();
    } catch (error) {
      return sendUnauthorizedResponse(
        response,
        "Unauthorized - you need to login"
      );
      // next(error);
    }
  };
};
