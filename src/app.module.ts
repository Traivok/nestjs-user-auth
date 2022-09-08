import { Module }                                        from '@nestjs/common';
import { AppService }                                    from './app.service';
import { UserModule }                                    from './user/user.module';
import { ConfigModule, ConfigService }                   from '@nestjs/config';
import { TypeOrmModule }                                 from '@nestjs/typeorm';
import { User }                                          from './user/entities/user.entity';
import * as Joi                                          from 'joi';
import { CookieSessionModule, NestCookieSessionOptions } from 'nestjs-cookie-session';
import { CommonsModule } from './commons/commons.module';
import getConfig                                         from '../config';

@Module({
  imports:     [
    ConfigModule.forRoot({
      isGlobal:         true,
      load:             [ getConfig ],
      validationSchema: Joi.object({
        NODE_ENV:       Joi.string()
                          .valid('dev', 'prod', 'test')
                          .default('dev'),
        PORT:           Joi.number().default(3000),
        COOKIE_SECRETE: Joi.string(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject:     [ ConfigService ],
      useFactory: (conf: ConfigService) => ( {
        type:        'postgres',
        database:    conf.get<string>('DB_NAME'),
        entities:    [ User ],
        synchronize: conf.get<boolean>('DB_SYNC'),
      } ),
    }),

    CookieSessionModule.forRootAsync({
      inject:     [ ConfigService ],
      useFactory: async (conf: ConfigService): Promise<NestCookieSessionOptions> => ( {
        session: { secret: conf.get<string>('COOKIE_SECRET') },
      } ),
    }),

    UserModule,

    CommonsModule,
  ],
  controllers: [ ],
  providers:   [ AppService ],
})
export class AppModule {}
