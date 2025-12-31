import { API_URL } from "@/constants";
import axois from "axios";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  try {
    const res = await axois.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      const msg = error?.message || "login failed";
      throw Error(msg);
    } else {
      throw Error("Login failed");
    }
  }
};

export const register = async (
  email: string,
  password: string,
  username: string,
  avatar?: string | null
): Promise<{ token: string }> => {
  try {
    const res = await axois.post(`${API_URL}/api/auth/register`, {
      email,
      password,
      username,
      avatar,
    });

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      const msg = error?.message || "register failed";
      throw Error(msg);
    } else {
      throw Error("register failed");
    }
  }
};
