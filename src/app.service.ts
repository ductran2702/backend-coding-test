import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlogService } from './modules/blog/blog.service';

@Injectable()
export class AppService {
  constructor(public readonly blogService: BlogService) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  addWordToBlogTitleJob(): void {
    this.blogService.addWordToAllBlogs();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
