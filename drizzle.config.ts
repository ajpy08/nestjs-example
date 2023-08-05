import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv'; // installed by @nestjs/config
dotenv.config();

export default {
  strict: false,
  driver: 'mysql2',
  out: './src/db/migrations',
  schema: './src/db/schemas/*',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    password: 'D@codes22',
    database: 'test',
  },
} satisfies Config;
