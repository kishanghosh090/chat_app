import type { Request, Response } from "express";
import UserModel from "../models/User.models.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.ts";

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    user = new UserModel({
      username,
      email,
      password,
      avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${username}`,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const token = generateToken(user);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, msg: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ success: false, msg: "Invalid Credentials" });
      return;
    }

    await user.save();
    const token = generateToken(user);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export { register, login };
