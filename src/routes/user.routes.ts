import express, { Router, type Express } from "express";
import { endPoint } from "../utils/endpoints";
import * as UserController from "../controller/user.controller";
import * as AdminController from "../controller/admin.controller";
import auth from "../utils/auth";

const userRoutes: Router = express.Router();

userRoutes.post(
  endPoint.Reservation.ADD_RESERVATION,
  auth.required,
  AdminController.checkExistingUser,
  AdminController.checkVerifiedUser,
  UserController.checkReservationByUser,
  UserController.checkReservationBySeat,
  UserController.reservationBusSeat
);

userRoutes.get(
  endPoint.Reservation.GET_TODAY_RESERVATION,
  auth.required,

  UserController.getTodayReservation
);

userRoutes.put(
  endPoint.Reservation.CANCEL_RESERVARTION,
  auth.required,

  AdminController.checkExistingUser,
  UserController.cancelReservartion
);

userRoutes.post(
  endPoint.Authentification.REGISTRATION,
  AdminController.checkExistingUserByEmail,
  UserController.createUser
);

userRoutes.post(
  endPoint.Authentification.LOGIN,
  AdminController.checkExistingUserByEmail,
  UserController.loginUser
);

export default userRoutes;
