import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { BlogDto } from './BlogDto';

export class BlogsPageDto {
  @ApiProperty({
    type: BlogDto,
    isArray: true,
  })
  readonly data: BlogDto[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: BlogDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
