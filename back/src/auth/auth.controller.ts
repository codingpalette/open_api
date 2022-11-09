import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { ApiCookieAuth, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import {LoginAuthDto} from "./dto/login-auth.dto";


@ApiTags('v2/유저')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get('')
  testGet() {
    // throw new HttpException('제목을 입력해주세요', 401);
    return Object.assign({
      "aa":"안녕!"
    });
  }

  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  async authLogin(@Body() body: LoginAuthDto) {
    await this.authService.authCreate(body)
    return true
  }


  @ApiOperation({ summary: '유저 검색'})
  // @ApiQuery({ name: 'user_id'})
  @Get('search')
  authSearch(@Query() query: LoginAuthDto) {
    console.log(query)
    return true
  }


}
