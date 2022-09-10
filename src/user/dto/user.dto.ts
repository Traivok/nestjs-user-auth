import { ApiProperty } from '@nestjs/swagger';
import { Expose }      from 'class-transformer';
import { UserRoles }   from '../entities/user.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  @ApiProperty({ format: 'email' })
  email: string;

  @Expose()
  nickname: string;

  @Expose()
  role: UserRoles;
}
