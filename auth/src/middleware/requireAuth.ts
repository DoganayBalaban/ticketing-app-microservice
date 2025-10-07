import type { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "./errorHandler.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
