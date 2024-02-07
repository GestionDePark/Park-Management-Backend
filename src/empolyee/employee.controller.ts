import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmpolyeeDto } from './dto/create-empolyee.dto';
import { UpdateEmpolyeeDto } from './dto/update-empolyee.dto';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
    constructor(private readonly empolyeeService: EmployeeService) {}

    @Post()
    @UseGuards(AdminGuard)
    create(@Body() createEmpolyeeDto: CreateEmpolyeeDto) {
        return this.empolyeeService.create({
            ...createEmpolyeeDto,
            salary: +createEmpolyeeDto.salary,
        });
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.empolyeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.empolyeeService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    update(
        @Param('id') id: string,
        @Body() updateEmpolyeeDto: UpdateEmpolyeeDto,
    ) {
        return this.empolyeeService.update(id, updateEmpolyeeDto);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.empolyeeService.remove(id);
    }
}
