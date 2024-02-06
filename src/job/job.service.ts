import { Injectable, UseGuards } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class JobService {
    constructor(private prismaService: PrismaService) {}

    async create(createJobDto: CreateJobDto) {
        return this.prismaService.job.create({
            data: {
                ...createJobDto,
            },
        });
    }

    async findAll() {
        return this.prismaService.job.findMany();
    }

    findOne(id: string) {
        return this.prismaService.job.findUnique({
            where: {
                id: id,
            },
        });
    }

    update(id: string, updateJobDto: UpdateJobDto) {
        return this.prismaService.job.update({
            data: {
                name: updateJobDto.name,
            },
            where: {
                id: id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.job.delete({
            where: {
                id: id,
            },
        });
    }
}
