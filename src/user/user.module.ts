import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';
import { AuthService }                from './auth/auth.service';
import { AuthController }             from './auth/auth.controller';
import { LocalStrategyService }       from './auth/strategies/local-strategy.service';
import { UserService }                from './user.service';
import { UserController }             from './user.controller';
import { TypeOrmModule }              from '@nestjs/typeorm';
import { User }                       from './entities/user.entity';
import { CurrentUserMiddleware }      from './current-user.middleware';
import { PassportModule }             from '@nestjs/passport';
import { JwtModule }                  from '@nestjs/jwt';
import { ConfigService }              from '@nestjs/config';

@Module({
  imports:     [
    TypeOrmModule.forFeature([ User ]),
    PassportModule,
    JwtModule.registerAsync({
      inject:     [ ConfigService ],
      useFactory: (conf: ConfigService) => ( {
        signOptions: { expiresIn: '120s' },
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
  ],
})
export class UserModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
