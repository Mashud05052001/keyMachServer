import { Response } from 'express';

type TSendResponseProps<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

const sendResponse = <T>(
  res: Response,
  providedData: TSendResponseProps<T>,
) => {
  const { statusCode, success, message, data } = providedData;
  res.status(statusCode).json({
    success,
    message,
    data: data,
  });
};

export default sendResponse;
