import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { UserSeed } from 'src/modules/user/seed/user.seed';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserService } from 'src/modules/user/user.service';

import { SharedModule } from './shared.module';

@Module({
  imports: [
    CommandModule,
    SharedModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserSeed, UserService],
  exports: [UserSeed],
})
export class SeedsModule {}
