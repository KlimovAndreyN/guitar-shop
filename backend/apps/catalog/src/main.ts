/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PrefixOption } from '@backend/shared/core';
import { catalogConfig, CatalogConfig } from '@backend/catalog/config';

import { AppModule } from './app/app.module';
import { InjectRequestIdInterceptor, InjectUserIdInterceptor } from '@backend/shared/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const сatalogOption = app.get<CatalogConfig>(catalogConfig.KEY);
  const { port } = сatalogOption;

  app.setGlobalPrefix(PrefixOption.Global);

  //Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(PrefixOption.Swagger, app, documentFactory);
  //

  app.useGlobalInterceptors(
    new InjectRequestIdInterceptor(),
    new InjectUserIdInterceptor()
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${PrefixOption.Global}`);
  Logger.log(`Swagger on: http://localhost:${port}/${PrefixOption.Swagger}`);
}

bootstrap();
