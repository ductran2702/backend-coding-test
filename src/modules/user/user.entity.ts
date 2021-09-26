import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { UserDto } from './dto/UserDto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true })
  name: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  //   @Column({ nullable: true })
  //   phone: string;

  // @Column({ nullable: true })
  // avatar: string;

  dtoClass = UserDto;
}
