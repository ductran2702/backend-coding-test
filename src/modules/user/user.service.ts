import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/common/constants/role-type';
import { FindConditions } from 'typeorm';
import { AdminRegisterDto } from '../auth/dto/AdminRegisterDto';

//import { FileNotImageException } from '../../exceptions/file-not-image.exception';
//import { IFile } from '../../interfaces/IFile';
//import { AwsS3Service } from '../../shared/services/aws-s3.service';
//import { ValidatorService } from '../../shared/services/validator.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    public readonly userRepository: UserRepository, //public readonly validatorService: ValidatorService, //public readonly awsS3Service: AwsS3Service,
    public readonly firebaseAuth: FirebaseAuthenticationService,
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }
  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | undefined> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }
    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }

    return queryBuilder.getOne();
  }

  async createUser(
    userRegisterDto: UserRegisterDto,
    //file: IFile,
  ): Promise<UserEntity> {
    await this.firebaseAuth.createUser({
      ...userRegisterDto,
      displayName: userRegisterDto.name,
    });

    const user = this.userRepository.create({
      ...userRegisterDto,
    });
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async createAdminUser(
    adminRegisterDto: AdminRegisterDto,
    //file: IFile,
  ): Promise<UserEntity> {
    await this.firebaseAuth.createUser({
      ...adminRegisterDto,
      displayName: adminRegisterDto.name,
    });

    const user = this.userRepository.create({
      ...adminRegisterDto,
      role: RoleType.ADMIN,
    });
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where('user.role = :role', { role: RoleType.USER });
    const [users, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }
}
