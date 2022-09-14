import { BeforeRemove, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Logger }                                                                 from '@nestjs/common';
import { Exclude }                                                                from 'class-transformer';

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
  username: string;

  @Column()
  password: string;

  @Column({ name: 'is_admin', default: false, })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @BeforeRemove()
  logRemoval() {
    this.logger.log('Removing user0old: ' + this.username);
  }
}
