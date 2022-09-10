import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService }                from './user.service';
import { UserController }             from './user.controller';
import { TypeOrmModule }              from '@nestjs/typeorm';
import { User }                       from './entities/user.entity';
import { CurrentUserMiddleware }      from './current-user.middleware';

@Module({
  imports:     [ TypeOrmModule.forFeature([ User ]) ],
  controllers: [ UserController, AuthController ],
  providers:   [ UserService, AuthService ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
