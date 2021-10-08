import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { BlogService } from './blog.service';
import { PublicBlogController } from './public.blog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository])],
  controllers: [BlogController, PublicBlogController],
  exports: [BlogService],
  providers: [BlogService],
})
export class BlogModule {}
