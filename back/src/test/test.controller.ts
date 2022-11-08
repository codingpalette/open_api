import { Controller, Get, Post, Body, Req, Res, HttpException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import {testPostDto} from "./dto/test-post.dto";

@ApiTags('Swagger') // swagger에 tag를 생성해줌
@Controller('test')
export class TestController {

  @ApiOperation({ summary: '워크스페이스 채널 모두 가져오기' })
  @Get(':url/channels')
  testGet(@Param('url') url,) {
    // throw new HttpException('제목을 입력해주세요', 401);
    return Object.assign({
      "aa":"안녕!"
    });
  }

  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @Post()
  testPost(@Body() body: testPostDto) {
    console.log(body)
    return true
  }
}
