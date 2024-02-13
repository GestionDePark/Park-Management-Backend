import { Injectable } from '@nestjs/common';
import { CreateEmpolyeeDto } from './dto/create-empolyee.dto';
import { UpdateEmpolyeeDto } from './dto/update-empolyee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
    constructor(private prismaService: PrismaService) {}
    async create(createEmpolyeeDto: CreateEmpolyeeDto): Promise<Employee> {
        return this.prismaService.employee.create({
            data: createEmpolyeeDto,
        });
    }
    async findAll(): Promise<Employee[]> {
        return this.prismaService.employee.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        isAdmin: true,
                        password: false,
                        Employee: false,
                        email: false,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prismaService.employee.findUnique({
            where: {
                id: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        isAdmin: true,
                        password: false,
                        Employee: false,
                        email: false,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    async update(id: string, updateEmpolyeeDto: UpdateEmpolyeeDto) {
        return this.prismaService.employee.update({
            data: updateEmpolyeeDto,
            where: {
                id: id,
            },
        });
    }

    async remove(id: string): Promise<Employee> {
        return this.prismaService.employee.delete({
            where: {
                id: id,
            },
        });
    }
}
