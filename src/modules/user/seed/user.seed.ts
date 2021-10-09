import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { AdminRegisterDto } from 'src/modules/auth/dto/AdminRegisterDto';

@Injectable()
export class UserSeed {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
    //autoExit: true,
  })
  async create() {
    const adminRegisterDto = new AdminRegisterDto({
      name: 'admin',
      email: 'admin@yopmail.com',
      dob: Date(),
      password: '12345678',
    });
    await this.userService.createAdminUser(adminRegisterDto);
  }
}
