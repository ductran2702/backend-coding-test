'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '../../guards/roles.guard';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private _userService: UserService) {}

  @Get('users')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UsersPageDto,
  })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    return this._userService.getUsers(pageOptionsDto);
  }
}
