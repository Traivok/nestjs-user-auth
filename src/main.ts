import { NestFactory }                    from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                      from './app.module';
import { CommonsModule }                  from './commons/commons.module';
import { UserModule }                     from './user/user.module';
import * as session                       from 'express-session';
import { ConfigService }                  from '@nestjs/config';
import { string }                         from 'joi';

( async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger([ 'log', 'warn', 'error', 'verbose', 'debug' ]);

  const swaggerConf = new DocumentBuilder()
    .setTitle('User boilerplate')
    // .setDescription('API description')
    // .setVersion('1.0')
    // .addTag('user')
    // .addCookieAuth('authCookie', {
    //   type: 'http',
    //   in: 'Header',
    //   scheme: 'Bearer'
    // })
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConf, {
    deepScanRoutes: true,
    include:        [ CommonsModule, UserModule ],
  }));

  const configService = app.get<ConfigService>(ConfigService);
  const secret = configService.get<string>('COOKIE_SECRET');

  if (typeof secret !== 'string' || secret.length === 0)
    throw new Error('Invalid cookie secret: ' + secret );

  app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
  }));

  await app.listen(3000);
} )();
