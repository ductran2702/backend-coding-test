import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as faker from 'faker';

@Injectable()
export class AppService {
  @Cron(CronExpression.EVERY_5_SECONDS)
  addWordToBlogTitleJob(): void {
    console.log('addWordToBlogTitleJob', faker.random.words(1));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
