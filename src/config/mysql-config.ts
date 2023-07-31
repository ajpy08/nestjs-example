import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const mysqlConfig: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'local' ? true : ['error', 'warn', 'info'],
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
  migrations: [join(__dirname + '/../migrations/**/*{.ts,.js}')],
  extra: {
    decimalNumbers: true,
    supportBigNumbers: true,
    bigNumberStrings: false,
  },
};

export const conenctionSource = new DataSource(mysqlConfig);
