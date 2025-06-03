import express, { Router, type Express } from "express";
import { endPoint } from "../utils/endpoints";
import * as AdminController from "../controller/admin.controller";
import auth from "../utils/auth";
import { authenticate } from "../middleware/authMiddleware";
import { protectAuth } from "../middleware/cookieJwtAuth";
import { authorizeRole } from "../middleware/authorizeRole";

const adminRouter: Router = express.Router();

adminRouter.post(
  endPoint.Admin.WHITE_LIST_USERS,
  authorizeRole(["ADMIN"]),
  authenticate,
  AdminController.AddUserInWhiteLIst
);
adminRouter.get(
  endPoint.Admin.LIST_ALL_USERS,
  protectAuth,
  authorizeRole(["ADMIN"]),
  AdminController.ListAllUserInWhiteList
);
adminRouter.delete(
  endPoint.Admin.DELETE_USER,
  authorizeRole(["ADMIN"]),
  protectAuth,
  AdminController.checkExistingUserWhiteList,
  AdminController.DeleteUserInWhiteList
);

adminRouter.get(
  endPoint.Reservation.GET_ALL_RESERVATION,
  authorizeRole(["ADMIN"]),
  protectAuth,
  AdminController.GetReservationListController
);

adminRouter.put(
  endPoint.Admin.VERIFY_USER,
  authorizeRole(["ADMIN"]),
  protectAuth,
  AdminController.checkExistingUser,
  AdminController.UpdateVerificationUser
);

export default adminRouter;
