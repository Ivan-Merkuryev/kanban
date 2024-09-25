// import { Department } from '@prisma/client';
import { Task } from '@prisma/client';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class TaskReportDto {
  @IsString()
  text: string;

  @IsString()
  task: Task

  @IsNumber()
  @IsOptional()
  grade?: number
}
