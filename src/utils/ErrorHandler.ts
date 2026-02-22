import { ERRORS } from "./messages";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequest extends AppError {
  constructor(message = ERRORS.BAD_REQUEST) {
    super(message, 400);
  }
}
