import { expressjwt as jwt } from "express-jwt";
import { Request } from "express";

const getTokenFromHeaders = (req: Request): string | undefined => {
  const authHeader = req.headers.authorization;
  if (
    authHeader &&
    (authHeader.split(" ")[0] === "Token" ||
      authHeader.split(" ")[0] === "Bearer")
  ) {
    return authHeader.split(" ")[1];
  }
  return undefined;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET || "superSecret",
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET || "superSecret",
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
};

export default auth;
