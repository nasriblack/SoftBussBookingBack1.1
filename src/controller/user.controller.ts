import { NextFunction, Response, Request } from "express";
import * as userService from "../services/user.service";
import {
  sendBadRequestResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
} from "../utils/responseHandler";
import HttpStatusCode from "../utils/httpStatusCode";
import { Destination } from "@prisma/client";

export const reservationBusSeat = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const reservationPayload = request.body;
    await userService.createReservation(reservationPayload);
    return sendSuccessResponse(response, [], HttpStatusCode.CREATED);
  } catch (error) {
    next(error);
  }
};

export const checkReservationBySeat = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const seatId = request.body.seat;
    const existingReservation = await userService.checkSeatStatus(seatId);
    if (existingReservation) {
      sendBadRequestResponse(response, "The seat already taken");
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const checkReservationByUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = request.body.userId;
    console.log("checking the userID", userId);
    const existingReservation = await userService.checkUserSeat(userId);
    if (existingReservation) {
      sendBadRequestResponse(response, "This user have a seat");
    }
    next();
  } catch (error) {
    next(error);
  }
};
export const getTodayReservation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const destination = request.params.destination;
    const todayReservation = await userService.getTodayBookingList(
      destination as Destination
    );
    return sendSuccessResponse(response, todayReservation, HttpStatusCode.OK);
  } catch (error) {
    next(error);
  }
};
