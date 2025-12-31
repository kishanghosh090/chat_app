import { API_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = async (): Promise<Socket> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in AsyncStorage");
  }
  if (!socket) {
    socket = io(API_URL, {
      auth: {
        token,
      },
    }); // Replace with your server URL

    // wait for the socket to connect
    await new Promise<void>((resolve, reject) => {
      socket!.on("connect", () => {
        console.log(socket?.id);

        resolve();
      });
    });
    socket?.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
