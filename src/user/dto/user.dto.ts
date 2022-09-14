import { ApiProperty } from '@nestjs/swagger';
import { Expose }      from 'class-transformer';

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
  username: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  createdAt: Date;
}
