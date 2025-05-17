import express, { Router, type Express } from "express";
import { endPoint } from "../utils/endpoints";
import * as UserController from "../controller/user.controller";
import * as AdminController from "../controller/admin.controller";

const userRoutes: Router = express.Router();

userRoutes.post(
  endPoint.Reservation.ADD_RESERVATION,
  AdminController.checkExistingUser,
  AdminController.checkVerifiedUser,
  UserController.checkReservationByUser,
  UserController.checkReservationBySeat,
  UserController.reservationBusSeat
);

userRoutes.get(
  endPoint.Reservation.GET_TODAY_RESERVATION,
  UserController.getTodayReservation
);

export default userRoutes;
