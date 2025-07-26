import { NextFunction, Response, Request } from "express";
import * as userService from "../services/user.service";
import {
  sendBadRequestResponse,
  sendSuccessNoDataResponse,
  sendSuccessResponse,
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
    console.log("checking seatId:", seatId);
    const existingReservation = await userService.checkSeatStatus(seatId);
    console.log("existingReservation:", existingReservation);
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

export const cancelReservartion = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const payloadRequest = request.body;
    await userService.cancelMyReservation(payloadRequest);
    return sendSuccessResponse(response, [], HttpStatusCode.ACCEPTED);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userPayload = request.body;
    if (!userPayload.email) {
      return sendBadRequestResponse(response, "email is required");
    }
    if (!userPayload.password) {
      return sendBadRequestResponse(response, "password is required");
    }
    const userCreation = await userService.createUserService(userPayload);
    return sendSuccessResponse(response, userCreation, HttpStatusCode.CREATED);
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userPayload = request.body;
    if (!userPayload.email) {
      return sendBadRequestResponse(response, "email is required");
    }
    if (!userPayload.password) {
      return sendBadRequestResponse(response, "password is required");
    }
    const userCreation = await userService.loginUserService(userPayload);

    if (userCreation) {
      response.cookie("jwt", userCreation.token, {
        httpOnly: true,
        secure: process.env.APP_ENV !== "developement",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return sendSuccessResponse(
        response,
        userCreation,
        HttpStatusCode.CREATED
      );
    } else
      return sendBadRequestResponse(response, "email or password is invalid");
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  console.log("checkign the req", request.cookies);
  try {
    response.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return sendSuccessNoDataResponse(response, "Logout Successful");
  } catch (error) {
    next(error);
  }
};
