'use strict';

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/BlogDto';
import { CreateBlogDto } from './dto/CreateBlogDto';
import { IdDto } from '../../common/dto/IdDto';
import { UpdateBlogDto } from './dto/UpdateBlogDto';

@Controller('blogs')
@ApiTags('blogs')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'Token' })
export class BlogController {
  constructor(private _blogService: BlogService) {}

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
