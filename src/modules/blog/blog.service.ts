import { Injectable } from '@nestjs/common';
import { FindConditions, UpdateResult } from 'typeorm';
import * as faker from 'faker';

import { BlogsPageDto } from './dto/BlogsPageDto';
import { BlogsPageOptionsDto } from './dto/BlogsPageOptionsDto';
import { BlogEntity } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogDto } from './dto/BlogDto';
import { CreateBlogDto } from './dto/CreateBlogDto';
import { Order } from 'src/common/constants/order';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class BlogService {
  constructor(
    public readonly blogRepository: BlogRepository, //public readonly validatorService: ValidatorService, //public readonly awsS3Service: AwsS3Service,
    public readonly firestoreService: FirebaseFirestoreService, //private readonly _i18n: I18nService,
  ) {}

  /**
   * Find single blog
   */
  findOne(findData: FindConditions<BlogEntity>): Promise<BlogEntity> {
    return this.blogRepository.findOne(findData);
  }

  async createBlog(blogRegisterDto: CreateBlogDto): Promise<BlogEntity> {
    const blog = this.blogRepository.create({
      ...blogRegisterDto,
    });
    const savedBlog = await this.blogRepository.save(blog);

    const docRef = this.firestoreService.collection('blogs').doc(savedBlog.id);
    await docRef.set({
      ...blogRegisterDto,
    });

    return savedBlog;
  }

  async updateBlog(blogDto: BlogDto): Promise<BlogEntity> {
    const docRef = this.firestoreService.collection('blogs').doc(blogDto.id);
    await Promise.all([
      this.blogRepository.update(
        {
          id: blogDto.id,
        },
        blogDto,
      ),
      docRef.set({
        ...blogDto,
      }),
    ]);

    return this.blogRepository.findOne(blogDto.id);
  }

  async deleteBlog(blogId: string): Promise<boolean> {
    const docRef = this.firestoreService.collection('blogs').doc(blogId);

    await Promise.all([this.blogRepository.delete(blogId), docRef.delete()]);

    return true;
  }

  async addWordToAllBlogs(): Promise<void> {
    let blogsPage: BlogsPageDto;
    let page: number = 1;
    let pageOptionsDto: BlogsPageOptionsDto;
    const take = 2;
    do {
      pageOptionsDto = {
        page,
        order: Order.ASC,
        take,
        skip: (page - 1) * take,
      };
      blogsPage = await this.getBlogs(pageOptionsDto);
      page++;
      blogsPage.data.forEach(async blog => {
        blog.title += ' ' + faker.random.words(1);
        await this.updateBlog(blog);
      });
    } while (blogsPage.meta.hasNextPage);

    return;
  }

  async getBlogs(pageOptionsDto: BlogsPageOptionsDto): Promise<BlogsPageDto> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');
    const [blogs, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new BlogsPageDto(blogs.toDtos(), pageMetaDto);
  }

  async getBlog(blogId: string): Promise<BlogDto> {
    return this.blogRepository.findOne(blogId);
  }
}
