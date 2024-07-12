import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './app/config';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { AllRoutes } from './app/routes';

const app: Application = express();
const port = config.port || 5000;

// parser
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: `The server is running on ${port} port`,
  });
});

// connect with routes
app.use('/api', AllRoutes);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
