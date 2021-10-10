import './boilerplate.polyfill';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { firebaseAuthMiddleware } from './middlewares/firebaseAuth.middleware';
import { BlogModule } from './modules/blog/blog.module';
import { BlogController } from './modules/blog/blog.controller';
import * as firebaseConfig from './config/serviceAccount.json';
import { SeedsModule } from './shared/seeds.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BlogModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(firebaseConfig as any),
      }),
    }),
    ScheduleModule.forRoot(),
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(firebaseAuthMiddleware).forRoutes(BlogController);
  }
}
