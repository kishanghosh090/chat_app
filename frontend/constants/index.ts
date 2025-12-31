import { Platform } from "react-native";

export const API_URL =
  Platform.OS == "android"
    ? "http://192.168.101.8:3003"
    : "http://localhost:3003";
// Kishanghosh0090@gmail.com
