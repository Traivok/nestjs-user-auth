import { NestFactory }                    from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                      from './app.module';
import { CommonsModule }                  from './commons/commons.module';
import { UserModule }                     from './user/user.module';
import { appConfigure }                   from './AppConfigure';

( async function bootstrap() {
  const app = appConfigure(await NestFactory.create(AppModule));

  app.useLogger([ 'log', 'warn', 'error', 'verbose', 'debug' ]);

  const swaggerConf = new DocumentBuilder()
    .setTitle('User boilerplate')
    // .setDescription('API description')
    .setVersion('1.0')
    .addTag('user')
    .addBearerAuth({
        type:         'http',
        scheme:       'bearer',
        bearerFormat: 'JWT',
        name:         'JWT',
        description:  'Enter your JWT Token',
        in:           'header',
      },
      'access_token')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConf, {
    deepScanRoutes: true,
    include:        [ CommonsModule, UserModule ],
  }));

  await app.listen(3000);
} )();
