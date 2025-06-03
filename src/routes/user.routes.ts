import express, { Router, type Express } from "express";
import { endPoint } from "../utils/endpoints";
import * as UserController from "../controller/user.controller";
import * as AdminController from "../controller/admin.controller";
import { protectAuth } from "../middleware/cookieJwtAuth";

const userRoutes: Router = express.Router();

userRoutes.post(
  endPoint.Reservation.ADD_RESERVATION,
  protectAuth,
  AdminController.checkExistingUser,
  AdminController.checkVerifiedUser,
  UserController.checkReservationByUser,
  UserController.checkReservationBySeat,
  UserController.reservationBusSeat
);

userRoutes.get(
  endPoint.Reservation.GET_TODAY_RESERVATION,
  protectAuth,

  UserController.getTodayReservation
);

userRoutes.put(
  endPoint.Reservation.CANCEL_RESERVARTION,
  protectAuth,

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
userRoutes.post(
  endPoint.Authentification.LOGOUT,
  protectAuth,
  UserController.logoutUser
);

export default userRoutes;
