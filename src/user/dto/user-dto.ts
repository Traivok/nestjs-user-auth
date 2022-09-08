import { ApiProperty } from '@nestjs/swagger';
import { Expose }      from 'class-transformer';

export class UserDto {
  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  /**
   * @format email
   */
  email: string;

  @Expose()
  nickname: string;
}
