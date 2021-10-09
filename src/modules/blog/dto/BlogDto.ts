'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { BlogEntity } from '../blog.entity';

export class BlogDto extends AbstractDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  content: string;

  constructor(blogEntity: BlogEntity) {
    super(blogEntity);
    this.title = blogEntity.title;
    this.content = blogEntity.content;
  }
}
