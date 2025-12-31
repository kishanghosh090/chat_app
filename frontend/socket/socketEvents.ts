import { getSocket } from "./socket";

export const testSocket = (payload: any, off: boolean) => {
  const socket = getSocket();
  if (!socket) {
    console.log("socket not connected");
    return;
  }
  if (off) {
    // turn off
    socket.off("testSocket", payload);
  } else if (typeof payload == "function") {
    socket.on("testSocket", payload);
  } else {
    socket.emit("testSocket", payload);
  }
};
