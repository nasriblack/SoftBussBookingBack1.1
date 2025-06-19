import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { apiVersion } from "./utils/endpoints";
import AdminRouter from "./routes/admin.routes";
import UserRouter from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/not-found";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { socketService } from "./socket/service_socket";
import nodeCron from "node-cron";
import { prismaClient } from "./utils/prisma";
import { cronJobDeleteReservation } from "./utils/cronJob";

const app = express();
const server = http.createServer(app);

socketService.initializeSocket(server);

app.get("/ws", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(apiVersion, AdminRouter);
app.use(apiVersion, UserRouter);

app.use(errorHandler);
app.use(notFoundHandler);
cronJobDeleteReservation();

export default server;
