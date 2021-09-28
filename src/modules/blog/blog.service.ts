import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

//import { FileNotImageException } from '../../exceptions/file-not-image.exception';
//import { IFile } from '../../interfaces/IFile';
//import { AwsS3Service } from '../../shared/services/aws-s3.service';
//import { ValidatorService } from '../../shared/services/validator.service';
import { BlogsPageDto } from './dto/BlogsPageDto';
import { BlogsPageOptionsDto } from './dto/BlogsPageOptionsDto';
import { BlogEntity } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogDto } from './dto/BlogDto';

@Injectable()
export class BlogService {
  constructor(
    public readonly blogRepository: BlogRepository, //public readonly validatorService: ValidatorService, //public readonly awsS3Service: AwsS3Service,
  ) {}

  /**
   * Find single blog
   */
  findOne(findData: FindConditions<BlogEntity>): Promise<BlogEntity> {
    return this.blogRepository.findOne(findData);
  }

  async createBlog(
    blogRegisterDto: BlogDto,
    //file: IFile,
  ): Promise<BlogEntity> {
    const blog = this.blogRepository.create({
      ...blogRegisterDto,
    });
    const savedBlog = await this.blogRepository.save(blog);
    return savedBlog;
  }

  async getBlogs(pageOptionsDto: BlogsPageOptionsDto): Promise<BlogsPageDto> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');
    const [blogs, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new BlogsPageDto(blogs.toDtos(), pageMetaDto);
  }
}
