import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class testPostDto {
  @IsNumber()
  @ApiProperty({
    example: 'zerohch0@gmail.com',
    description: '이메일',
  })
  readonly id: number;

  @IsString()
  @ApiProperty({
    example: 'zerohch0@gmail.com',
    description: '이메일',
  })
  readonly username: string;
}