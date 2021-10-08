'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class BlogIdDto {
  @ApiProperty()
  id: string;
}
