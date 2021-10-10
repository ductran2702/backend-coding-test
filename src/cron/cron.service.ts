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
    await this.addWordToAllBlogs();
  }

  async addWordToAllBlogs(): Promise<void> {
    let blogsPage: BlogsPageDto;
    let page: number = 1;
    let pageOptionsDto: BlogsPageOptionsDto;
    const take = 10;
    do {
      pageOptionsDto = {
        page,
        order: Order.ASC,
        take,
        skip: (page - 1) * take,
      };
      blogsPage = await this._blogService.getBlogs(pageOptionsDto);
      page++;
      for (const blog of blogsPage.data) {
        blog.title += ' ' + faker.random.words(1);
        await this._blogService.updateBlog(blog.id, blog);
      }
    } while (blogsPage.meta.hasNextPage);

    return Promise.resolve();
  }
}
