'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { BlogEntity } from '../blog.entity';

export class BlogDto extends AbstractDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  content: string;

  constructor(user: BlogEntity) {
    super(user);
    this.title = user.title;
    this.content = user.content;
  }
}
