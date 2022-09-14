import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService }                  from '@nestjs/config';
import { UserService }                    from '../../user.service';
import { Strategy }                       from 'passport-jwt';
import { JwtPayload }                     from '../Jwt';
import { PassportStrategy }               from '@nestjs/passport';
import { AuthService }                    from '../auth.service';

@Injectable()
export class JwtAdminStrategyService extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(protected configService: ConfigService,
              protected authService: AuthService,
              private userService: UserService) {
    super({
      jwtFromRequest:   authService.getExtractingMethods(),
      ignoreExpiration: false,
      secretOrKey:      configService.getOrThrow<string>('COOKIE_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { username, isAdmin } = await this.userService.findOneOrFail(payload.id);

    if (!isAdmin)
      throw new ForbiddenException(`User ${ username } is not an admin`);

    return { id: payload.id };
  }
}
