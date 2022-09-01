import { NestFactory }                    from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule }                      from './app.module';

( async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger([ 'log', 'warn', 'error', 'verbose', 'debug' ]);

  const swaggerConf = new DocumentBuilder()
    .setTitle('Udemy example')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('report')
    .addCookieAuth('authCookie', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer'
    })
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConf));

  await app.listen(3000);
} )();
