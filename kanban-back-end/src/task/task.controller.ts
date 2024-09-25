import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { TaskDto } from './dto/task.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskReportDto } from './dto/taskReport.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll() {
    return this.taskService.getAll();
  }

  @Get('/one/:id') 
  async getOne(@Param('id') id: string) {
    return this.taskService.getOne(id)
  }

  @Get('/report/:id') 
  async getTaskReport(@Param('id') id: string) {
    return this.taskService.getTaskReport(id)
  }

  @Get('/me')
  @Auth()
  async getMyTasks(@CurrentUser('id') id: string) {
    return this.taskService.getTasksForMe(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
    return this.taskService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: TaskDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.taskService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @Post('/report/:id')
  @Auth()
  async writeAReport(@Body() dto: TaskReportDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.taskService.writeAReport(dto, userId, id); 
  }

  @Post('/reserve/:id')
  @Auth()
  async reserveATask(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.taskService.reserveATask(userId, id)
  }

  @Post('/grade-report/:id')
  @Auth()
  async writeGradeReport(@Body() dto: TaskReportDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.taskService.writeGradeReport(dto, userId, id); 
  }

  // @Post('/grade/:id')
  // @Auth()
  // async grade(@Body() dto: UserReportDto, @CurrentUser('id') userId: string, @Param('id') id: string) {
  //   return this.taskService.userReport(dto, userId, id); 
  // }
 
}