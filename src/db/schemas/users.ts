import {
  mysqlTable,
  serial,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').default('').notNull(),
  firstName: text('firstName').default('').notNull(),
  lastName: text('lastName').default('').notNull(),
  email: text('email').default('').notNull(),
  password: text('password').default('').notNull(),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;
