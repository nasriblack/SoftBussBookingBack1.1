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

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const onlineUsers = new Map<string, string>();

app.get("/ws", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Socket.IO handling
io.on("connection", (socket) => {
  const userId = socket.id;
  socket.join("room1");
  console.log(`User ${userId} connected and joined room1`);
  console.log("onlineUsers", onlineUsers);

  onlineUsers.set(userId, "user");

  const currentOnlineUsers = Array.from(onlineUsers.keys());
  io.emit("roomello", {
    currentOnlineUsers,
  });

  const rooms = socket.rooms;
  console.log("checking the rooms", rooms);
  if (rooms.has("room1")) {
    console.log(`${socket.id} is in room1`);
  }
  console.log(`Sent online users list to ${userId}:`, currentOnlineUsers);

  console.log("A user connected", socket.id);
  socket.on("chat message", (msg) => {
    console.log("Message from client:", msg);
    io.emit("chat message", msg);
    console.log("1");
  });

  // socket.broadcast.to("room1").emit("roomello1", "hello to our room");
  io.to("room1").emit("roomello1", "welcome to our room");
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
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

export default server;
