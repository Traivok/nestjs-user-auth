import { Injectable }       from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy }         from 'passport-jwt';
import { ConfigService }    from '@nestjs/config';
import { JwtPayload }       from '../Jwt';
import { UserService }      from '../../user.service';
import { AuthService }      from '../auth.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService,
              private authService: AuthService,
              private userService: UserService) {
    super({
      jwtFromRequest:   authService.getExtractingMethods(),
      ignoreExpiration: false,
      secretOrKey:      configService.getOrThrow<string>('COOKIE_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    await this.userService.findOneOrFail(payload.id);
    return { id: payload.id };
  }
}