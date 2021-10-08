import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRegisterDto } from './UserRegisterDto';

export class AdminRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly dob: Date;

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;

  constructor(data: {
    name: string;
    email: string;
    dob: string;
    password: string;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.dob = new Date(data.dob);
    this.password = data.password;
  }
}
