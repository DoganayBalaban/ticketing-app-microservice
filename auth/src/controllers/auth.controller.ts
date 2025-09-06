import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { BadRequestError } from "../middleware/errorHandler.js";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = User.build({
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user.id,
      email: user.email,
    },
  });
};

export const signin = (req: Request, res: Response) => {
  res.send("Signin endpoint!");
};

export const signout = (req: Request, res: Response) => {
  res.send("Signout endpoint!");
};

export const currentUser = (req: Request, res: Response) => {
  res.send("Current user endpoint!");
};
