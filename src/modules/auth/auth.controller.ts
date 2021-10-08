import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/dto/UserDto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/UserRegisterDto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    public readonly userService: UserService,
    public readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body()
    userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser.toDto();
  }
}
