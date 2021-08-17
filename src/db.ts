import { createConnection, ConnectionOptions } from 'typeorm';
import { config } from './config';
import { User } from './entities/User.model';


export const connectToDb = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: config.HOST,
      port: config.POSTGRES_PORT,
      username: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
      database: config.POSTGRES_DB,
      entities: [
        User
      ],
      synchronize: true,
      logging: false,
      keepConnectionAlive: true
    } as ConnectionOptions);
  } catch (err) {
    console.log(err.message);
  }
};

export const TryDbConnect = async (cb: () => void) => {
  try {
    await connectToDb();
    cb();
  } catch (e) {
    console.error('TryDbConnect err');
  }
};