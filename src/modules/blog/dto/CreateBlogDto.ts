'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsDateString,
  IsString,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly content: string;
}
