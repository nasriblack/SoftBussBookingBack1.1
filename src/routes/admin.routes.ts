import express, { Router, type Express } from "express";
import { endPoint } from "../utils/endpoints";
import * as AdminController from "../controller/admin.controller";

const adminRouter: Router = express.Router();

adminRouter.post(
  endPoint.Admin.WHITE_LIST_USERS,
  AdminController.AddUserInWhiteLIst
);
adminRouter.get(
  endPoint.Admin.LIST_ALL_USERS,
  AdminController.ListAllUserInWhiteList
);
adminRouter.delete(
  endPoint.Admin.DELETE_USER,
  AdminController.checkExistingUserWhiteList,
  AdminController.DeleteUserInWhiteList
);

adminRouter.get(
  endPoint.Reservation.GET_ALL_RESERVATION,
  AdminController.GetReservationListController
);

adminRouter.put(
  endPoint.Admin.VERIFY_USER,
  AdminController.checkExistingUser,
  AdminController.UpdateVerificationUser
);

export default adminRouter;
