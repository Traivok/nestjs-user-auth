import { Injectable }           from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService }        from '@nestjs/config';
import { JwtPayload }           from '../Jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:      configService.get<string>('COOKIE_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId, username: payload.username };
  }
}