import { IsEmail, IsString } from 'class-validator';
import { ApiProperty }       from '@nestjs/swagger';
import { Transform }         from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Leroy' })
  firstname: string;

  @IsString()
  @ApiProperty({ example: 'Jenkins' })
  lastname: string;

  @IsEmail()
  @ApiProperty({ format: 'email' })
  email: string;

  @Transform(({ value }) => value.toLocaleLowerCase())
  @IsString()
  @ApiProperty({ example: 'leroy_jenkins' })
  username: string;

  @IsString()
  @ApiProperty({ format: 'password' })
  password: string;
}
