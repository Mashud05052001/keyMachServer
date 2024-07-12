import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    const data = {
      body: req?.body,
    };
    const parsedData = await schema.parseAsync(data);
    req.body = parsedData?.body;
    next();
  });
};

export default validateRequest;
