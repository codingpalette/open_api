import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/User";


@Module({
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
