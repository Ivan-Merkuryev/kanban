import { Body, Controller, Get, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserDto } from './dto/user.dto';
// import { UserReportDto } from './dto/userReport.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put()
    @Auth()
    async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
        return this.userService.update(id, dto)
    }

	@Get()
	@Auth()
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

    // @Get(':id')
	// @Auth()
	// async profile(@Param('id') id: string) {
	// 	return this.userService.getProfile(id)
	// }

    @Get('/me/users')
    @Auth()
    async usersForMe(@CurrentUser('id') id: string) {
        return this.userService.getUsersForMe(id)
    }

    // @Post(':id')
    // @Auth()
    // async writeAReport(@Body() dto: UserReportDto, @CurrentUser('id') myId: string,  @Param('id') id: string) {
    //     return this.userService.writeAReport(dto, myId, id)
    // }
}