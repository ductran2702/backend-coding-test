import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { BlogDto } from './dto/BlogDto';

@Entity({ name: 'blogs' })
export class BlogEntity extends AbstractEntity<BlogDto> {
  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  dtoClass = BlogDto;
}
