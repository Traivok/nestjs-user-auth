import { Module }                  from '@nestjs/common';
import { JwtStrategyService }      from './auth/strategies/jwt-strategy.service';
import { AuthService }             from './auth/auth.service';
import { AuthController }          from './auth/auth.controller';
import { LocalStrategyService }    from './auth/strategies/local-strategy.service';
import { JwtAdminStrategyService } from './auth/strategies/jwt-admin-strategy.service';
import { UserService }             from './user.service';
import { UserController }          from './user.controller';
import { TypeOrmModule }           from '@nestjs/typeorm';
import { User }                    from './entities/user.entity';
import { PassportModule }          from '@nestjs/passport';
import { JwtModule }               from '@nestjs/jwt';
import { ConfigService }           from '@nestjs/config';
import { APP_INTERCEPTOR }         from '@nestjs/core';
import { CurrentUserInterceptor }  from './interceptors/current-user.interceptor';

@Module({
  imports:     [
    TypeOrmModule.forFeature([ User ]),
    PassportModule,
    JwtModule.registerAsync({
      inject:     [ ConfigService ],
      useFactory: (conf: ConfigService) => ( {
        signOptions: { expiresIn: '1h' },
        secret:      conf.get<string>('COOKIE_SECRET'),
      } ),
    }),
  ],
  controllers: [
    UserController,
    AuthController,
  ],
  providers:   [
    UserService,
    AuthService,
    LocalStrategyService,
    JwtStrategyService,
    JwtAdminStrategyService,
    {
      provide:  APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UserModule {}
