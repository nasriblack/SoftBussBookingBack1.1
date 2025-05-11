import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { apiVersion } from "./utils/endpoints";
import AdminRouter from "./routes/admin.routes";
import UserRouter from "./routes/user.routes";

const app = express();
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(apiVersion, AdminRouter);
app.use(apiVersion, UserRouter);

export default app;
