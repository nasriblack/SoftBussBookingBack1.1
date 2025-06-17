// services/socketService.ts - Detailed Explanation

import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { BUS_NABEUL } from "../utils/const";
import { verifyToken } from "../utils/token";

class SocketService {
  private io: SocketIOServer | null = null;
  private onlineUsers = new Map<
    string,
    { userEmail: string; socketId: string }
  >();

  public initializeSocket(server: HttpServer): SocketIOServer {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    // This sets up all the socket event listeners
    this.setupSocketHandlers();
    return this.io;
  }

  public emitToUser(userId: string, event: string, data: any): void {
    if (!this.io) return;
    this.io.to(`user:${userId}`).emit(event, data);
  }

  public emitToAll(event: string, data: any): void {
    if (!this.io) return;
    this.io.emit(event, data);
  }

  public emitSeatUpdate(busId: number, seatData: any): void {
    if (!this.io) return;
    this.io.to(`bus:${busId}`).emit("seat:update", seatData);
  }

  private setupSocketHandlers(): void {
    if (!this.io) return;

    // This runs every time a new user connects to WebSocket
    this.io.on("connection", (socket: Socket) => {
      // TODO: here from the handshake we will check if we have the cockies in headers or not ! => middleware
      console.log(`User joined with socket ${socket.id}`);

      this.handleUserConnect(socket);
      this.handleSeatBooking(socket);

      this.chatMessage(socket);
      this.handleDisconnection(socket); // Listens for "disconnect" event
    });
  }

  private handleUserConnect(socket: Socket): void {
    // This sets up a listener for the "user:join" event from client

    socket.on("user:login", async (data) => {
      const token: any = socket.handshake?.query?.token;
      if (!token) {
        socket.disconnect();
        return;
      }
      try {
        const decoded: any = await verifyToken(token);
        const {
          user: { email },
        } = decoded;
        this.onlineUsers.set(socket.id, {
          userEmail: email,
          socketId: socket.id,
        });
      } catch (error) {
        socket.disconnect();
        return;
      }

      // Store the user in our online users map => will implement the user email
      console.log("cheeckign the onlineUsers", this.onlineUsers);
      // Join user to their personal room for direct messages
      socket.join(BUS_NABEUL);

      // Let everyone know the online users list changed
      this.emitOnlineUsers();
      this.emitBusNabeul();
    });
  }

  private handleSeatBooking(socket: Socket): void {
    // Handle when user clicks on a seat (before confirming booking)
    socket.on(
      "seat:select",
      (data: { seatNumber: string; busId: number; userId: string }) => {
        try {
          const dataObj = JSON.parse(data as any);

          // Tell other users this seat is being considered
          socket.broadcast.emit("seat:selected", {
            seatNumber: dataObj.seatNumber,
            userId: dataObj.userId,
          });
        } catch (error) {
          console.log("catching error", error);
        }
      }
    );

    // Handle actual seat booking confirmation
    socket.on(
      "seat:book",
      (data: { seatNumber: string; busId: number; userId: string }) => {
        console.log("Seat booking:", data);

        // Tell ALL users this seat is now booked
        this.io?.emit("seat:booked", {
          seatNumber: data.seatNumber,
          userId: data.userId,
          timestamp: new Date(),
        });
      }
    );

    // Handle when user releases a seat (navigates away, cancels selection)
    socket.on("seat:release", (data: { seatNumber: string; busId: number }) => {
      console.log("Seat released:", data);

      // Tell other users this seat is available again
      socket.broadcast.emit("seat:released", {
        seatNumber: data.seatNumber,
        busId: data.busId,
      });
    });
  }

  private handleDisconnection(socket: Socket): void {
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Remove user from our tracking
      this.onlineUsers.delete(socket.id);

      // Update everyone's online users list
      this.emitOnlineUsers();
      this.emitBusNabeul();
    });
  }

  private emitOnlineUsers(): void {
    if (!this.io) return;

    const onlineUsersList = Array.from(this.onlineUsers.values());
    this.io.emit("roomello", { users: onlineUsersList });
  }
  private emitBusNabeul(): void {
    if (!this.io) return;

    const onlineUsersList = Array.from(this.onlineUsers.values());
    this.io.to(BUS_NABEUL).emit("roomello1", { users: onlineUsersList });
  }

  private chatMessage(socket: Socket): void {
    if (!this.io) return;
    socket.on("chat message", (msg) => {
      this.emitToAll("chat message", msg);
    });
  }
}

// Export singleton instance
export const socketService = new SocketService();
