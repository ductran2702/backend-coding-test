import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { CronModule } from './cron.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(CronModule, adapter);
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
};

export const handler: Handler = async (event, context) => {
  await bootstrapServer();
};
