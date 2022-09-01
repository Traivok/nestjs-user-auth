import { Module }                                        from '@nestjs/common';
import { AppController }                                 from './app.controller';
import { AppService }                                    from './app.service';
import { UserModule }                                    from './user/user.module';
import { ConfigModule, ConfigService }                   from '@nestjs/config';
import { TypeOrmModule }                                 from '@nestjs/typeorm';
import { User }                                          from './user/entities/user.entity';
import * as Joi                                          from 'joi';
import { CookieSessionModule, NestCookieSessionOptions } from 'nestjs-cookie-session';

@Module({
  imports:     [
    ConfigModule.forRoot({
      isGlobal:         true,
      envFilePath:      `.env.${ process.env.NODE_ENV ?? 'dev' }`,
      validationSchema: Joi.object({
        NODE_ENV:       Joi.string()
                          .valid('dev', 'prod', 'test')
                          .default('dev'),
        PORT:           Joi.number().default(3000),
        COOKIE_SECRETE: Joi.string(),
      }),
    }),

    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject:     [ ConfigService ],
    //   useFactory: (conf: ConfigService) => ( {
    //     type:        'postgres',
    //     database:    conf.get<string>('DB_NAME'),
    //     entities:    [ User ],
    //     synchronize: true,
    //   } ),
    // }),

    CookieSessionModule.forRootAsync({
      inject:     [ ConfigService ],
      useFactory: async (conf: ConfigService): Promise<NestCookieSessionOptions> => ( {
        session: { secret: conf.get<string>('COOKIE_SECRET') },
      } ),
    }),

    UserModule,
  ],
  controllers: [ AppController ],
  providers:   [ AppService ],
})
export class AppModule {}
