import type { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(201).json({
    message: "User created successfully",
    user: { email, password },
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
