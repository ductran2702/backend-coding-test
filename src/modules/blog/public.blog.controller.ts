'use strict';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
//import { I18nService } from 'nestjs-i18n';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
//import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { BlogsPageDto } from './dto/BlogsPageDto';
import { BlogsPageOptionsDto } from './dto/BlogsPageOptionsDto';
import { BlogEntity } from './blog.entity';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/BlogDto';

@Controller('blogs')
@ApiTags('blogs')
@UseGuards(RolesGuard) //AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiHeader({ name: 'Token' })
export class BlogController {
  constructor(
    private _blogService: BlogService, //private readonly _i18n: I18nService,
  ) {}
  @Get('blogs')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: BlogsPageDto,
  })
  getBlogs(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: BlogsPageOptionsDto,
  ): Promise<BlogsPageDto> {
    return this._blogService.getBlogs(pageOptionsDto);
  }
}
