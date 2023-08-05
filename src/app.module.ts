import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { DbConfig } from './config';

@Module({
  imports: [
    UsersModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true, load: [DbConfig] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
