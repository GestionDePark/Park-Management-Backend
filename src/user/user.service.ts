import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { omit } from '../utils/object.utils';
import { CryptoService } from '../crypto/crypto.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private cryptoService: CryptoService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        return omit(
            await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: await this.cryptoService.crypt(
                        createUserDto.password,
                    ),
                },
            }),
            ['password'],
        );
    }

    async findAll() {
        const users = await this.prismaService.user.findMany();
        return users.map((user) => omit(user, ['password']));
    }

    async findOne(id: string): Promise<Omit<User, 'password'>> {
        return omit(
            await this.prismaService.user.findUnique({
                where: {
                    id: id,
                },
            }),
            ['password'],
        );
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.prismaService.user.update({
            data: updateUserDto,
            where: {
                id: id,
            },
        });
    }

    async findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.user.delete({
            where: {
                id: id,
            },
        });
    }
}
