import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/mysql-config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mysqlConfig,
      name: 'mysql',
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
