import { isEmail, IsEmail, IsString, Min } from 'class-validator';
import { ApiProperty }                     from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  /**
   * @format email
   */
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  /**
   * @format 'password'
   */
  password: string;
}
