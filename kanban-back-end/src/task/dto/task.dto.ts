// import { Hashtags } from '@prisma/client';
// import { Transform } from 'class-transformer';
import { Department } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsEnum(Department, { each: true })
  department: Department[];

  @IsString()
  @IsOptional()
  whoReserved: string;

  @IsString()
  @IsOptional()
  whoDone: string;

  
}