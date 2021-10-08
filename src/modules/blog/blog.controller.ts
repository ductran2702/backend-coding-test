'use strict';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
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
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';
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
import { CreateBlogDto } from './dto/CreateBlogDto';
import { UtilsService } from 'src/providers/utils.service';
import { IdDto } from '../../common/dto/IdDto';
import { UpdateBlogDto } from './dto/UpdateBlogDto';

@Controller('blogs')
@ApiTags('blogs')
@UseGuards(RolesGuard) //AuthGuard, RolesGuard)
//@UseInterceptors(AuthUserInterceptor)
@ApiHeader({ name: 'Token' })
export class BlogController {
  constructor(
    private _blogService: BlogService, //private readonly _i18n: I18nService,
  ) {}

  @Post('create')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create blog',
    type: BlogDto,
  })
  async createBlog(
    @Body()
    createBlogDto: CreateBlogDto,
  ): Promise<BlogDto> {
    const createdBlog = await this._blogService.createBlog(createBlogDto);
    return createdBlog.toDto();
  }

  @Put('update')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update blog',
    type: BlogDto,
  })
  async updateBlog(
    @Query(new ValidationPipe({ transform: true }))
    blogIdDto: IdDto,
    @Body()
    blogDto: UpdateBlogDto,
  ): Promise<BlogDto> {
    const updatedBlog = await this._blogService.updateBlog(
      blogIdDto.id,
      blogDto,
    );
    return updatedBlog.toDto();
  }

  @Delete('delete')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update blog',
    type: Boolean,
  })
  async deleteBlog(
    @Query(new ValidationPipe({ transform: true }))
    blogIdDto: IdDto,
  ): Promise<boolean> {
    return this._blogService.deleteBlog(blogIdDto.id);
  }
}
