/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { BearerAuth, BearerAuthOption, PrefixOption } from '@backend/shared/core';
import { InjectBearerAuthInterceptor } from '@backend/shared/interceptors';
import { apiConfig, ApiConfig } from '@backend/api/config';

import { AppModule } from './app/app.module';
import { InjectRequestIdGuard } from './app/guards/inject-request-id.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiOption = app.get<ApiConfig>(apiConfig.KEY);
  const { port, accountServiceUrl, blogPostServiceUrl, fileStorageServiceUrl } = apiOption;

  app.setGlobalPrefix(PrefixOption.Global);

  //Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Api API')
    .setDescription('The Api API description')
    .setVersion('1.0')
    .addBearerAuth(BearerAuthOption, BearerAuth.AccessToken)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(PrefixOption.Swagger, app, documentFactory);
  //

  app.useGlobalGuards(new InjectRequestIdGuard());
  app.useGlobalInterceptors(new InjectBearerAuthInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  // Микросервисы
  Logger.log(`Account Service on: ${accountServiceUrl}`);
  Logger.log(`Catalog Service on: ${blogPostServiceUrl}`);
  Logger.log(`FileStorage Service on: ${fileStorageServiceUrl}`);
  //
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${PrefixOption.Global}`);
  Logger.log(`Swagger on: http://localhost:${port}/${PrefixOption.Swagger}`);
}

bootstrap();
