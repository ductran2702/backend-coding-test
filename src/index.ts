import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { setupSwagger } from './viveo-swagger';
import { AppService } from './app.service';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  setupSwagger(app);
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
};

const bootstrap = async (): Promise<Server> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appService = app.get(AppService);
  appService
    .seed()
    .then(() => {
      console.log('Seeding complete!');
    })
    .catch(error => {
      console.log('Seeding failed!');
      throw error;
    });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: false,
      exceptionFactory: errors => new UnprocessableEntityException(errors),
    }),
  );
  setupSwagger(app);

  const port = 3000;
  console.info(`server running on port ${port}`);
  await app.listen(port);
  return awsServerlessExpress.createServer(app);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
