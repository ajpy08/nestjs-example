import { Inject, Injectable } from '@nestjs/common';
import { NewUser, User, users } from '../db/schemas/users';
import { DB, DbType } from '../db/providers/db.provider';
import { desc, eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly db: DbType) {}
  async create(user: NewUser) {
    const result = await this.db.insert(users).values(user);

    return { id: result[0].insertId };
  }

  async findAll() {
    return this.db.select().from(users).orderBy(desc(users.createdAt));
    // return await this.conn.query.users.findMany();
  }

  async findOne(id: number) {
    const result = await this.db.select().from(users).where(eq(users.id, id));

    return result.length === 0 ? null : result[0];
  }

  async update(id: number, user: Partial<User>) {
    const result = await this.db
      .update(users)
      .set(user)
      .where(eq(users.id, id));

    return result[0].affectedRows;
  }

  async remove(id: number) {
    const result = await this.db.delete(users).where(eq(users.id, id));

    return result[0].affectedRows;
  }
}
