import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {User} from "../entities/User";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}


  // 유저 생성 함수
  async userCreate(body) {
    // 이미 가입된 유저인지 검증
    const userInfo = await this.userIdFindOne(body.user_id);
    if (userInfo) {
      throw new HttpException('이미 가입된 아이디 입니다.', 401);
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    await this.usersRepository.save({
      user_id: body.user_id,
      password: hashedPassword
    })
  }

  // 유저 아이디 하나 조회 함수
  async userIdFindOne(user_id: string) {
    return await this.usersRepository.findOne({
      where: {user_id: user_id}
    })
  }

  // 유저 로그인 함수
  async userLogin(body) {
    console.log(body)
  }
}
