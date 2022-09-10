import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  emailOrNickname: string;

  @IsString()
  password: string;
}
