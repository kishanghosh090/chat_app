import { Platform } from "react-native";

export const API_URL =
  Platform.OS == "android" ? "http://10.0.2.2:3003" : "http://localhost:3003";
// Kishanghosh090@gmail.com
