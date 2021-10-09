'use strict';

import { HttpException } from '@nestjs/common';

export class EmailExistedException extends HttpException {
  constructor() {
    super('Email registered by another user', 400);
  }
}
