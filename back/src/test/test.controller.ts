import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {

  @Get()
  testGet() {
    return Object.assign({
      data: {
        "aa":"안녕!"
      }
    });
  }
}
