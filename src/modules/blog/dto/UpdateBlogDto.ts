'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly title: string;

  @IsString()
  @ApiPropertyOptional()
  readonly content: string;
}
