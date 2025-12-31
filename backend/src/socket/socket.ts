import "dotenv/config";
import { Server as SockerIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";

export function initializeSocket(server: any): SockerIOServer {
  const io = new SockerIOServer(server, {
    cors: {
      origin: "*",
    },
  });
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Auth error: no token provider"));
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("Invalid Token"));
        }
        // attatch user data to socket
        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;
        next();
      }
    );
  });

  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log("user connected", userId, socket.data.name);
    // register the events

    io.on("disconnect", () => {
      console.log("user disconnected", userId);
    });
  });
  return io;
}
