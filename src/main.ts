import { NestFactory }                                            from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                                              from './app.module';
import { CommonsModule }                                          from './commons/commons.module';
import { UserModule }                                             from './user/user.module';

( async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger([ 'log', 'warn', 'error', 'verbose', 'debug' ]);

  const swaggerConf = new DocumentBuilder()
    .setTitle('Udemy example')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('user')
    .addCookieAuth('authCookie', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer'
    })
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConf, {
    deepScanRoutes: true,
    include: [CommonsModule, UserModule],
  }));

  await app.listen(3000);
} )();
