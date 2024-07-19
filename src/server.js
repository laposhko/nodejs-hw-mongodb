import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth-router.js';
// import pino from 'pino-http';
import env from './utils/env.js';
import { initMongoDB } from './db/initMongoDB.js';
import contactsRouter from './routers/contacts-router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));
function setupServer() {
  initMongoDB();
  const app = express();
  // const logger = pino({ transport: { target: 'pino-pretty' } });
  // app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.use(contactsRouter);
  app.use(authRouter);
  //error handle
  app.use(notFoundHandler);
  app.use(errorHandler);
  //starting server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default setupServer;
