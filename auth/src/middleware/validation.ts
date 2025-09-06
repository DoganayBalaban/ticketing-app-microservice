import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "./errorHandler.js";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      message: error.msg,
      field: error.type === "field" ? (error as any).path : undefined,
    }));

    throw new RequestValidationError(formattedErrors);
  }

  next();
};
