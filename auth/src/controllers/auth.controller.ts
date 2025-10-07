import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { BadRequestError } from "../middleware/errorHandler.js";
import jwt from "jsonwebtoken";

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
  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user.id,
      email: user.email,
    },
    token: userJwt,
  });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw new BadRequestError("Invalid credentials");
  }
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: userJwt,
  };
  res.status(200).json(user);
};

export const signout = (req: Request, res: Response) => {
  res.send("Signout endpoint!");
};

export const currentUser = (req: Request, res: Response) => {
  res.send("Current user endpoint!");
};
