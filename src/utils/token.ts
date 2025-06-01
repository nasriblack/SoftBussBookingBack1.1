import jwt from "jsonwebtoken";

export const generateToken = (user: any): string =>
  jwt.sign({ user }, process.env.JWT_SECRET || "superSecret", {
    expiresIn: "1d",
  });

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
