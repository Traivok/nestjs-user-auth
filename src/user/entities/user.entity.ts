import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Logger }                         from '@nestjs/common';
import { Exclude }                        from 'class-transformer';

export enum UserRoles {
  admin = 'Admin',
  manager = 'Manager',
  user = 'User',
}

@Entity('users')
export class User {
  @Exclude()
  private readonly logger = new Logger(User.name);

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.user,
  })
  role: UserRoles;
}
