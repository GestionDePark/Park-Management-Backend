import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from '../utils/object.utils';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { User } from '@prisma/client';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiProperty({
        description: 'Create an User ',
    })
    @UseGuards(AdminGuard)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('self')
    findOne(
        @Request()
        request: AuthenticatedRequest,
    ) {
        return this.userService.findOne(request.user.sub);
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
