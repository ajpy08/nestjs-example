import { FactoryProvider, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DbConfig } from '../../config';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import * as mysql from 'mysql2/promise';

export const DB = Symbol('DB_SERVICE');
export type DbType = MySql2Database;

export const DbProvider: FactoryProvider = {
  provide: DB,
  inject: [DbConfig.KEY],
  useFactory: async (dbConfig: ConfigType<typeof DbConfig>) => {
    const logger = new Logger('DB');

    logger.debug('Connecting to Db...');

    const connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'D@codes22',
      database: 'test',
      // uri: dbConfig.prodBranchUrl,
      // multipleStatements: true,
      // waitForConnections: true,
      // connectionLimit: 10,
      // maxIdle: 10,
      // idleTimeout: 60000,
      // queueLimit: 0,
      // enableKeepAlive: true,
      // keepAliveInitialDelay: 0,
    });

    logger.debug('Connected to db!');

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    const db = drizzle(connection, {
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });

    await migrate(db, { migrationsFolder: './src/db/migrations' });

    return db;
  },
};
