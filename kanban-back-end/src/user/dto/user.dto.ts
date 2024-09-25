import { Department, Role } from '@prisma/client';
// import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @MinLength(6, {
    message: 'Пароль должен состоять не менее чем из 6 символов',
  })
  @IsString()
  password?: string;

  @IsEnum(Department)
  department?: Department;

  @IsEnum(Role)
  role?: Role
  
  @IsNumber()
  @IsOptional()
  rating?: number
}