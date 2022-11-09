import {Controller, Get} from '@nestjs/common';
import {ApiCookieAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";


@ApiTags('v1/유저')
@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '내 정보 가져오기' })
  @Get('')
  testGet() {
    // throw new HttpException('제목을 입력해주세요', 401);
    return Object.assign({
      "aa":"안녕!"
    });
  }
}
