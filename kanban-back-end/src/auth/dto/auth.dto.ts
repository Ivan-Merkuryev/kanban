import { Department, Role } from '@prisma/client';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Пароль должен состоять не менее чем из 6 символов',
  })
  @IsString()
  password: string;

  @IsEnum(Department)
  @IsOptional()
  department?: Department;

  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @IsNumber()
  @IsOptional()
  rating?: number
}
