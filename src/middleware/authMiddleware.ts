import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendBadRequestResponse } from "../utils/responseHandler";

interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    // return next(new AppError("No Authorization header provided", 401));
    return sendBadRequestResponse(res, "No Authorization header provided");
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return sendBadRequestResponse(res, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      //   return next(new AppError(`Invalid token: ${error.message}`, 401));
      return sendBadRequestResponse(res, `Invalid token: ${error.message}`);
    }
    next(sendBadRequestResponse(res, "Authentication failed"));
  }
};
