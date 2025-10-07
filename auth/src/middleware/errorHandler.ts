import type { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  errors?: Array<{ message: string; field?: string }>;
}

export class RequestValidationError extends Error {
  statusCode = 400;

  constructor(public errors: Array<{ message: string; field?: string }>) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.message,
      field: err.field,
    }));
  }
}

export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export class NotFoundError extends Error {
  statusCode = 404;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}

export class BadRequestError extends Error {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class NotAuthorizedError extends Error {
  statusCode = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error("Error:", err);

  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err instanceof NotAuthorizedError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  // Default error
  res.status(500).json({
    errors: [{ message: "Something went wrong" }],
  });
};
