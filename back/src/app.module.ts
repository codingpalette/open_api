import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TestModule } from './test/test.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {User} from "./entities/User";




@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      migrations: [__dirname + '/src/migrations/*.ts'],
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: true,
      logging: false,
      keepConnectionAlive: true,
    }),
    TestModule,
    ItemModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
