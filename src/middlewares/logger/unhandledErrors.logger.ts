import { NextFunction, Request, Response } from 'express';
import { pipeline } from 'stream';
import fs from 'fs';
import path from 'path';

export const unhandledError = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    await pipeline(
      (`Req URL: ${req.url} \n Error: ${JSON.stringify(err)}  \n \n`),
      fs.createWriteStream(path.join(__dirname, '../../../logs/unhandledErrors.txt'), { flags: 'a' }),
      (e) => {
        if (e) {
          process.stderr.write(e.message);
          process.exit(1);
        }
      }
    );
    res.status(500).send({ message: 'Something failed!' });
  }
  next();
};