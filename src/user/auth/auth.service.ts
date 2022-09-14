import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User }                                  from '../entities/user.entity';
import { InjectRepository }                      from '@nestjs/typeorm';
import { Repository }                            from 'typeorm';
import { AuthDto }                               from '../dto/auth.dto';
import { JwtService }                            from '@nestjs/jwt';
import { Jwt, JwtPayload }                       from './Jwt';
import * as bcrypt                               from 'bcrypt';
import { CreateUserDto }                         from '../dto/create-user.dto';
import { UserService }                           from '../user.service';
import { UpdateUserDto }                         from '../dto/update-user.dto';
import { ExtractJwt, JwtFromRequestFunction }    from 'passport-jwt';
import { isNil }                                 from '@nestjs/common/utils/shared.utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@InjectRepository(User) private userRepo: Repository<User>,
              private userService: UserService,
              private jwtService: JwtService) {}

  async login(auth: AuthDto): Promise<User> {
    const { login, password } = auth;

    const user = await this.userRepo.createQueryBuilder()
      .where('username = :username', { username: login })
      .orWhere('email = :email', { email: login })
      .getOne();

    if (user === null || !await bcrypt.compare(password, user.password)) {
      throw new NotFoundException();
    }

    return user;
  }

  async loginJwt(user: User): Promise<Jwt> {
    const payload: JwtPayload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUser: CreateUserDto): Promise<User> {
    const { password, ...user } = createUser;
    const hash                  = await AuthService.hash(password);
    return await this.userService.create({ ...user, password: hash });
  }

  private static async hash(plain: string, saltRounds = 10): Promise<string> {
    return await bcrypt.hash(plain, saltRounds);
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<User> {
    let toUpdate = updateUser;

    if (updateUser.password !== undefined) {
      const hash = await AuthService.hash(updateUser.password);
      toUpdate = { ...toUpdate, password: hash };
    }

    return await this.userService.update(id, toUpdate);
  }

  public getJwtFromSession(session: Record<string, any>): Jwt | null {
    return 'jwt' in session ? session['jwt'] : null;
  }

  public setJwtToSession(session: Record<string, any>, jwt: Jwt) {
    session['jwt'] = jwt;
    return session;
  }

  public removeJwtOfSession(session: Record<string, any>) {
    delete session['jwt'];
  }

  public fromSessionAsBearerToken(): JwtFromRequestFunction {
    return (req): string | null => {
      const session: Record<string, any> | null | undefined = req.session;

      return isNil(session) ? null : this.getJwtFromSession(session)?.access_token ?? null;
    }
  }

  public getExtractingMethods(): JwtFromRequestFunction {
    return ExtractJwt.fromExtractors([
      this.fromSessionAsBearerToken(),
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ])
  }
}
