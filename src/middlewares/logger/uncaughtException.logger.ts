import * as fs from 'fs';
import * as path from 'path';

export const uncaughtException = async (err: Error, origin: string) => {
  fs.appendFileSync(
    path.join(__dirname, '../../../logs/uncaughtExceptions.txt'),
    `\nCaught exception: ${err}\nException origin: ${origin}`
  );
  process.stderr.write(`${err.message} \n`);
  process.exit(1);
};