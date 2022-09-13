import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy }   from '@nestjs/passport';
import { Strategy }           from 'passport-local';
import { AuthService }        from '../auth.service';
import { User }               from '../../entities/user.entity';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategyService.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<User> {
    return await this.authService.login({login, password});
  }
}
