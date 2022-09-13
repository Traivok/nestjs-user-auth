import { Injectable, NotFoundException } from '@nestjs/common';
import { User }                          from '../entities/user.entity';
import { InjectRepository }              from '@nestjs/typeorm';
import { Brackets, Repository }          from 'typeorm';
import { AuthDto }                       from '../dto/auth.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async login(auth: AuthDto): Promise<User> {
    const { login, password } = auth;

    const user = await this.userRepo.createQueryBuilder()
      .where(' password = :password ', { password })
      .andWhere(new Brackets((qb) => {
        qb.where('nickname = :nickname', { nickname: login })
          .orWhere('email = :email', { email: login });
      }))
      .getOne();

    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }
}
