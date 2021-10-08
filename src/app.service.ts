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

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  addWordToBlogTitleJob(): void {
    this.blogService.addWordToAllBlogs();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async seed() {
    const userAdmin = await this.userService.findOne({
      email: 'admin@yopmail.com',
    });
    if (userAdmin) {
      return Promise.resolve(null);
    }
    const adminRegisterDto = new AdminRegisterDto({
      name: 'admin',
      email: 'admin@yopmail.com',
      dob: Date(),
      password: '12345678',
    });
    const createdUser = await this.userService.createAdminUser(
      adminRegisterDto,
    );
  }
}
