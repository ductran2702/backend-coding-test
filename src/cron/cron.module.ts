import '../boilerplate.polyfill';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';

import { BlogModule } from '../modules/blog/blog.module';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigService } from 'src/shared/services/config.service';
import * as firebaseConfig from '../config/serviceAccount.json';
import { BlogService } from 'src/modules/blog/blog.service';
import { CronService } from './cron.service';
import { BlogRepository } from 'src/modules/blog/blog.repository';

@Module({
  imports: [
    BlogModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([BlogRepository]),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(firebaseConfig as any),
      }),
    }),
  ],
  controllers: [],
  providers: [CronService, BlogService],
})
export class CronModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
