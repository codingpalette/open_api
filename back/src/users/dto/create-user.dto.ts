import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'user_id',
    description: '유저 아이디',
  })
  public user_id: string;

  @IsString()
  @ApiProperty({
    example: 'password',
    description: '유저 비밀번호'
  })
  public password: string

}