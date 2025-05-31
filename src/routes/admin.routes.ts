import express, { Router, type Express } from "express";
import { endPoint } from "../utils/endpoints";
import * as AdminController from "../controller/admin.controller";
import auth from "../utils/auth";

const adminRouter: Router = express.Router();

adminRouter.post(
  endPoint.Admin.WHITE_LIST_USERS,
  auth.required,
  AdminController.AddUserInWhiteLIst
);
adminRouter.get(
  endPoint.Admin.LIST_ALL_USERS,
  auth.required,
  AdminController.ListAllUserInWhiteList
);
adminRouter.delete(
  endPoint.Admin.DELETE_USER,
  auth.required,
  AdminController.checkExistingUserWhiteList,
  AdminController.DeleteUserInWhiteList
);

adminRouter.get(
  endPoint.Reservation.GET_ALL_RESERVATION,
  auth.required,
  AdminController.GetReservationListController
);

adminRouter.put(
  endPoint.Admin.VERIFY_USER,
  auth.required,
  AdminController.checkExistingUser,
  AdminController.UpdateVerificationUser
);

export default adminRouter;
