import jwt from "jsonwebtoken";

const generateToken = (user: any): string =>
  jwt.sign({ user }, process.env.JWT_SECRET || "superSecret", {
    expiresIn: "1d",
  });

export default generateToken;
