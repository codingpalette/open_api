import { Injectable } from '@nestjs/common';
import {LoginAuthDto} from "./dto/login-auth.dto";

@Injectable()
export class AuthService {


  async authCreate(post_data: LoginAuthDto) {
    console.log('post_data', post_data)
  }
}
