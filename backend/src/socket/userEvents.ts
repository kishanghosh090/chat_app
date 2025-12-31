import { Socket, Server as SocketIOServer } from "socket.io";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  socket.on("testEvent", (data) => {
    console.log("Test event received:", data);
    io.emit("testEventResponse", {
      message: "Test event processed",
      receivedData: data,
    });
  });
  socket.on("user:join", (data) => {
    console.log("User joined:", data);
    io.emit("user:joined", data);
  });

  socket.on("user:leave", (data) => {
    console.log("User left:", data);
    io.emit("user:left", data);
  });
}
