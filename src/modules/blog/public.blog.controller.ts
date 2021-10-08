'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BlogsPageDto } from './dto/BlogsPageDto';
import { BlogsPageOptionsDto } from './dto/BlogsPageOptionsDto';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/BlogDto';
import { IdDto } from 'src/common/dto/IdDto';

@Controller('blogs')
@ApiTags('blogs')
export class PublicBlogController {
  constructor(
    private _blogService: BlogService, //private readonly _i18n: I18nService,
  ) {}
  @Get('blogs')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get blogs list',
    type: BlogsPageDto,
  })
  getBlogs(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: BlogsPageOptionsDto,
  ): Promise<BlogsPageDto> {
    return this._blogService.getBlogs(pageOptionsDto);
  }

  @Get('blog')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get blogs detail',
    type: BlogDto,
  })
  getBlog(
    @Query(new ValidationPipe({ transform: true }))
    blogIdDto: IdDto,
  ): Promise<BlogDto> {
    return this._blogService.getBlog(blogIdDto.id);
  }
}
