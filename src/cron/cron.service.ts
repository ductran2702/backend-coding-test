import { Handler } from 'aws-lambda';
import * as faker from 'faker';
import * as admin from 'firebase-admin';

import { BlogsPageDto } from 'src/modules/blog/dto/BlogsPageDto';
import { BlogsPageOptionsDto } from 'src/modules/blog/dto/BlogsPageOptionsDto';
import { Order } from 'src/common/constants/order';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { BlogService } from 'src/modules/blog/blog.service';
import { promises } from 'dns';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(public readonly _blogService: BlogService) {}

  async onModuleInit() {
    await this._blogService.addWordToAllBlogs();
  }
}
