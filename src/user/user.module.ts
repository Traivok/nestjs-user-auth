import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService }                from './user.service';
import { UserController }             from './user.controller';
import { TypeOrmModule }              from '@nestjs/typeorm';
import { User }                       from './entities/user.entity';
import { CurrentUserMiddleware }      from './current-user.middleware';

@Module({
  imports:     [ TypeOrmModule.forFeature([ User ]) ],
  controllers: [ UserController ],
  providers:   [ UserService ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
