import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  cachedServer = awsServerlessExpress.createServer(expressApp);
  return cachedServer;
};

bootstrapServer();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
