
import { Request, Response } from "express";

const RouteErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: any,
) => {
  try {
    res.status(error.statusCode || 500).json({
      message: error.message,
      data: [],
      error: {
        message: error.message || "something went wrong please try again!",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: [],
    });
  }
};

export default RouteErrorHandler;
