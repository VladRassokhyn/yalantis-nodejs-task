import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { TryDbConnect } from './db';
import { config } from './config';
import { usersRouter } from './resources/users.router';
import { logger } from './logger';

export const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/uploads/:fileName', (req: Request, res: Response) => {
  fs.createReadStream(path.join(__dirname, `./uploads/${req.params['fileName']!}`)).pipe(res);
});

app.use('/users', usersRouter);

TryDbConnect(() => app.listen(config.PORT, () => console.log('running')));

process.on('uncaughtException', logger.uncaughtException);
process.on('unhandledRejection', logger.unhandledRejection);