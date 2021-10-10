import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AdminRegisterDto } from './modules/auth/dto/AdminRegisterDto';
import { BlogService } from './modules/blog/blog.service';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AppService {
  constructor(
    public readonly blogService: BlogService,
    public readonly userService: UserService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
