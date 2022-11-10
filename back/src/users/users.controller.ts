import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {ApiCookieAuth, ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {UserDecorator} from "../decorators/user.decorator";
import {User} from "../entities/User";
import { AuthGuard } from '@nestjs/passport';


@ApiTags('v1/유저')
@Controller('v1/user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get('')
  testGet() {
    // throw new HttpException('제목을 입력해주세요', 401);
    return Object.assign({
      "aa":"안녕!"
    });
  }

  @Post('create')
  @ApiOperation({summary: '회원가입'})
  async userCreate(@Body() body: CreateUserDto) {
    await this.userService.userCreate(body)
    return true
  }


  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({summary: '로그인'})
  async login(@Request() req) {
    console.log('lll')
    return req.user;
  }
}
