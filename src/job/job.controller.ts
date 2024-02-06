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
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AdminGuard } from '../auth/admin.guard';
import { Job } from '@prisma/client';

@Controller('job')
@UseGuards(AdminGuard)
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Post()
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobService.create(createJobDto);
    }

    @Get()
    async findAll(): Promise<Job[]> {
        return this.jobService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Job> {
        return this.jobService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateJobDto: UpdateJobDto,
    ): Promise<Job> {
        return this.jobService.update(id, updateJobDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Job> {
        return this.jobService.remove(id);
    }
}
