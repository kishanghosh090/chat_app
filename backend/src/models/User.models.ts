import { Schema, model } from "mongoose";
import type { UserProps } from "../types.ts";

const UserSchema = new Schema<UserProps>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<UserProps>("User", UserSchema);

export default UserModel;
