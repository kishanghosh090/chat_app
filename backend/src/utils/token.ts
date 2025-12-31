import jwt from "jsonwebtoken";
import type { UserProps } from "../types.ts";

export const generateToken = (user: UserProps) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
