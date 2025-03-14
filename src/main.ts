import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { setupSwagger } from './viveo-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const reflector = app.get(Reflector);
  // app.useGlobalFilters(
  //   new HttpExceptionFilter(reflector),
  //   new QueryFailedFilter(reflector),
  // );
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

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
}
bootstrap();
