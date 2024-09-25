import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
// import { UserReportDto } from './dto/userReport.dto';
// import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  getUsersForMe(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  // async getMyDepartment(id: string) {
  //   const profile = await this.getById(id);
  //   return profile.department;
  // }

  async getProfile(id: string) {
    const profile = await this.getById(id);
    profile.tasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = profile;
    return userData;
  }

  // async getProfile(id: string) {
  //   const profile = await this.getById(id);

  //   if (!profile) {
  //     return;
  //   }
  //   profile.tasks.sort(
  //     (a, b) =>
  //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  //   );
  //   //eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password, ...userData } = profile;

  //   const users = await this.prisma.user.findMany({
  //     where: {
  //       NOT: {
  //         id: id, // userId - идентификатор текущего пользователя
  //       },
  //     },
  //   });
  //   const usersMeDepartment = users.filter(
  //     (usersForMe) => usersForMe.department === profile.department,
  //   );

  //   return { userData, usersMeDepartment };
  // }

  async create(dto: AuthDto) {
    const user = {
      name: dto.name,
      email: dto.email,
      department: dto.department,
      role: dto.role,
      rating: dto.rating,
      password: await hash(dto.password),
    };
    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
      },
    });
  }

  // async writeAReport(dto: UserReportDto, myId: string, id: string) {
  //   const taskReport = await this.prisma.reportTask.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       task: {
  //         include: {
  //           author: true,
  //         },
  //       },
  //     },
  //   });
  //   if (!taskReport) {
  //     throw new Error('Отчёт о задаче не найден');
  //   }
  //   if (taskReport.task.author.id !== myId) {
  //     throw new HttpException('Вы не можете оценить выполнение чужого задания', HttpStatus.FORBIDDEN);
  //   }
  //   // return taskReport
  //   const jobEvaluation = {
  //     text: dto.text,
  //     grade: dto.grade,
  //     user: {
  //       connect: { id: myId },
  //     },
  //     report: {
  //       connect: { id: id },
  //     },
  //   };
  //   return this.prisma.reportUser.create({ data: jobEvaluation });
  // }
}