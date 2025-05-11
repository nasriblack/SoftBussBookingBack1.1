import { NextFunction, Response, Request } from "express";
import * as userService from "../services/user.service";
import { sendSuccessResponse } from "../utils/responseHandler";
import HttpStatusCode from "../utils/httpStatusCode";

export const reservationBusSeat = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("checking the request", request.body);
    const reservationPayload = request.body;
    await userService.createReservation(reservationPayload);
    return sendSuccessResponse(response, [], HttpStatusCode.CREATED);
  } catch (error) {
    next(error);
  }
};
