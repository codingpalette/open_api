import { Controller, Get, Post, Body, Req, Res, HttpException } from '@nestjs/common';
import {testPostDto} from "./dto/test-post.dto";

@Controller('test')
export class TestController {

  @Get()
  testGet() {
    // throw new HttpException('제목을 입력해주세요', 401);
    return Object.assign({
      "aa":"안녕!"
    });
  }

  @Post()
  testPost(@Body() body: testPostDto) {
    console.log(body)
    return true
  }
}
