import { Request, Response } from "express";
import { sendNotFoundResponse } from "../utils/responseHandler";

export const notFoundHandler = (request: Request, response: Response): any => {
  const notFoundMessage = {
    Requested_URL: request.originalUrl,
    success: false,
    error: "Error 404 - Not Found",
  };
  return sendNotFoundResponse(response, notFoundMessage);
};
