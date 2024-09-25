import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskDto } from './dto/task.dto';
import { TaskReportDto } from './dto/taskReport.dto';

// function CalculateDate(createdAt: object, dedline: object) {

// }

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getOne(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getTasksForMe(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    const tasks = await this.getAll();
    const filteredTasks = tasks.filter((task) => task.author.id !== id);
    const tasksForMe = filteredTasks.filter((task) =>
      task.department.find((el) => el === user.department),
    );
    const today = new Date();
    const newTasks = tasksForMe.filter(
      (el) => el.deadline > today && !el.reserve,
    );
    const oldTasks = tasksForMe.filter(
      (el) => el.deadline < today && !el.reserve,
    );
    const youReservedTasks = tasksForMe.filter(
      (el) => el.whoReserved === id && !el.done,
    );
    const youCompletedTasks = tasksForMe.filter((el) => el.whoDone === id);
    return { newTasks, oldTasks, youReservedTasks, youCompletedTasks };
  }

  async create(dto: TaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }

  async delete(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  async getTaskReport(taskId: string) {
    const reports = await this.prisma.reportTask.findMany({
      where: {
        taskId: taskId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            rating: true,
          },
        },
      },
    });
    return reports[0];
  }

  async writeAReport(dto: TaskReportDto, userId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.FORBIDDEN);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedTask = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        done: true,
        whoDone: userId,
      },
    });
    if (updatedTask.userId === userId) {
      throw new HttpException(
        'Вы не можете выполнить свою задачу',
        HttpStatus.FORBIDDEN,
      );
    }
    const report = {
      text: dto.text,
      grade: dto.grade,
      user: {
        connect: { id: userId },
      },
      task: {
        connect: { id: taskId },
      },
    };
    return this.prisma.reportTask.create({
      data: report,
      include: {
        task: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  async reserveATask(userId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.FORBIDDEN);
    }
    if (task.userId === userId) {
      throw new HttpException(
        'Вы не можете зарезервировать свою задачу',
        HttpStatus.FORBIDDEN,
      );
    }
    if (task.reserve === false) {
      await this.prisma.task.update({
        where: { id: task.id },
        data: {
          reserve: true,
          whoReserved: userId,
        },
      });
    } else {
      await this.prisma.task.update({
        where: { id: task.id },
        data: {
          reserve: false,
          whoReserved: '',
        },
      });
    }

    const updatedTask = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    return updatedTask;
  }

  async writeGradeReport(dto: TaskReportDto, userId: string, taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        ReportTask: true,
      },
    });
    if (!task) {
      throw new HttpException('Задача не найдена', HttpStatus.FORBIDDEN);
    }
    // return task
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const updatedTask = await this.prisma.task.update({
    //   where: {
    //     id: taskId,
    //   },
    //   data: {
    //     done: true,
    //     whoDone: userId,
    //   },
    // });
    // if (updatedTask.userId === userId) {
    //   throw new HttpException(
    //     'Вы не можете выполнить свою задачу',
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    // console.log(updatedTask.userId, userId);

    const reportTask = task.ReportTask.find((userId) => userId === userId);

    const newReportTask = await this.prisma.reportTask.update({
      where: reportTask,
      data: {
        grade: dto.grade,
      },
    });

    const gradeList = await this.prisma.reportTask.findMany({
      where: {
        userId: task.whoReserved,
      },
    });

    const arr = gradeList.map((el) => el.grade);

    const userReport = await this.prisma.user.findUnique({
      where: {
        id: task.whoReserved,
      },
    });

    const rating = parseFloat(
      (arr.reduce((a, b) => a + b) / arr.length).toFixed(2),
    );

    await this.prisma.user.update({
      where: userReport,
      data: {
        rating: rating,
      },
    });

    return newReportTask;
  }

  // async writeAReport(dto: TaskReportDto, userId: string, taskId: string) {
  //   // const task = await this.prisma.task.findUnique({
  //   //   where: {
  //   //     id: taskId,
  //   //   },
  //   // });
  //   // if (!task) {
  //   //   throw new HttpException('Задача не найдена', HttpStatus.FORBIDDEN);
  //   // }
  //   // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   // const updatedTask = await this.prisma.task.update({
  //   //   where: {
  //   //     id: taskId,
  //   //   },
  //   //   data: {
  //   //     done: true,
  //   //     // whoDone: userId
  //   //   },
  //   // });
  //   // if (updatedTask.userId === userId) {
  //   //   throw new HttpException(
  //   //     'Вы не можете выполнить свою задачу',
  //   //     HttpStatus.FORBIDDEN,
  //   //   );
  //   // }
  //   const report = {
  //     text: dto.text,
  //     grade: dto.grade,
  //     user: {
  //       connect: { id: userId },
  //     },
  //     task: {
  //       connect: { id: taskId },
  //     },
  //   };
  //   return this.prisma.reportTask.create({
  //     data: report,
  //     include: {
  //       task: {
  //         include: {
  //           author: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // async userReport(dto: UserReportDto, userId: string, taskId: string) {
  //   const task = await this.prisma.task.findUnique({
  //     where: {
  //       id: taskId,
  //     },
  //   });
  //   if (!task) {
  //     throw new HttpException('Задача не найдена', HttpStatus.FORBIDDEN);
  //   }

  //   return task;
  // }
}
