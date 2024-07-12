import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { TErrorMessages } from "../interface/ErrorType";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 500,
    message = `Something went wrong!`,
    errorMessages: TErrorMessages = [
      {
        path: "",
        message: `Something went wrong!`,
      },
    ];

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // originalError : err,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
