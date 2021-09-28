import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { BlogEntity } from './blog.entity';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {}
