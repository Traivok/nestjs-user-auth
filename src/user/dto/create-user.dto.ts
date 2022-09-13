import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional }      from '@nestjs/swagger';
import { Transform }                             from 'class-transformer';
import { UserRoles }                             from '../entities/user.entity';

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

  @IsEnum(UserRoles)
  @IsOptional()
  @ApiPropertyOptional({ example: UserRoles.user })
  role: UserRoles;
}
