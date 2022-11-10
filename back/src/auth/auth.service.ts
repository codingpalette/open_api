import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}


  async authCreate(post_data) {
    console.log('post_data', post_data)
  }

  async validateUser(username: string, password: string) {
    console.log('12313123')
    const user = await this.usersRepository.findOne({
      where: { user_id: username },
    });
    console.log(user)
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
