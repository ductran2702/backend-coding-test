import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { ContextService } from '../../providers/context.service';
import { UtilsService } from '../../providers/utils.service';
import { UserDto } from '../user/dto/UserDto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
  private static _authUserKey = 'user_key';

  constructor(public readonly userService: UserService) {}

  async createToken(user: UserEntity | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: 30,
      accessToken: '',
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await UtilsService.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException();
    }
    return user;
  }

  static setAuthUser(user: UserEntity) {
    ContextService.set(AuthService._authUserKey, user);
  }

  static getAuthUser(): UserEntity {
    return ContextService.get(AuthService._authUserKey);
  }
}
