import { IsNumber, IsOptional, IsString } from 'class-validator';

export class testPostDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly username: string;
}