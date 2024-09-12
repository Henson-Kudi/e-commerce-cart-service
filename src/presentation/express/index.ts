import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from 'http';
import router from './routes';
import errorRequestHandler from './middlewares/errorHandler';
import envConf from '../../env.conf';
import logger from '../../utils/logger';
import { randomUUID } from 'crypto';
import AppError from '../../domain/valueObjects/error';
import { ResponseCodes } from '../../domain/enums/responseCode';

const app = express();

const PORT = envConf.PORT;

app.use(
  cors({
    origin: '*', //Manage cors as you want
  })
);

app.use(express.json());

app.use(morgan('dev')); // morgan for api route logging

const baseUrl = '/api/v1/cart-service'; // change as you like

// User must be authenticated before accessing this routes
app.use((req, res, next) => {
  // req.headers.user_id = 'a6da4d83-fc34-4d86-b9cf-2e1f01c30041'
  if (!req.headers.userId) {
    next(new AppError('Unauthorised request', ResponseCodes.Forbidden));
  } else {
    next();
  }
});

//
app.use(`${baseUrl}`, router);

// Attach error handler only attach all other route handlers
app.use(errorRequestHandler);

export default function startExpressServer(): {
  server: Server;
  app: express.Application;
} {
  const server = app.listen(PORT, () => {
    // Better to use a logger instead of just logging to console
    logger.info(`Server running at: http://localhost:${PORT}`);
  });

  return {
    server,
    app,
  };
}
