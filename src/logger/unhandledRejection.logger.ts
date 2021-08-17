import * as fs from 'fs';
import * as path from 'path';

export const unhandledRejection = async (err: Error, origin: string) => {
  fs.appendFileSync(
    path.join(__dirname, '../../../logs/unhandledRejection.txt'),
    `\nCaught exception: ${err}\nException origin: ${JSON.stringify(origin)}`
  );
  process.stderr.write(`Unhandled Rejection: ${err.message} \n`);
  process.exit(1);
};