import { Task } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class UserReportDto {
  @IsString()
  text: string;

  @IsNumber()
  grade: number

  @IsString()
  task: Task

}