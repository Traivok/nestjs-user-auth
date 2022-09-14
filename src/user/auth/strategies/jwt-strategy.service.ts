import { Injectable }                                   from '@nestjs/common';
import { PassportStrategy }                             from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { ConfigService }                                from '@nestjs/config';
import { JwtPayload }                                   from '../Jwt';
import { UserService }                                  from '../../user.service';
import { Request }                                      from 'express';

export const fromCookieAsBearerToken = (): JwtFromRequestFunction => (req: Request): string | null => {
  return null;
};

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService,
              private userService: UserService) {
    super({
      jwtFromRequest:   ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        fromCookieAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey:      configService.get<string>('COOKIE_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    await this.userService.findOneOrFail(payload.id);
    return { id: payload.id };
  }
}