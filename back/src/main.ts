import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 콜스 해결코드
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /** 스웨거 설정 시작 */
  const config = new DocumentBuilder()
    .setTitle('opan_api 문서')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, document);
  /** 스웨거 설정 끝 */

  // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
  // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
  // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  // 쿠기, 세션 설정
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
