import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Balance } from '@prisma/client';

@Injectable()
export class TransactionService {
    constructor(private prismaService: PrismaService) {}
    async create(createTransactionDto: CreateTransactionDto) {
        this.updateBalance(createTransactionDto.amount, 'INCREASE');
        return this.prismaService.transaction.create({
            data: createTransactionDto,
        });
    }

    findAll() {
        return this.prismaService.transaction.findMany();
    }

    findOne(id: string) {
        return this.prismaService.transaction.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: string, updateTransactionDto: UpdateTransactionDto) {
        const oldBalance = await this.balanceAmount();
        const balanceDiff = oldBalance - updateTransactionDto.amount;
        this.updateBalance(oldBalance, balanceDiff > 0 ? 'INCREASE': 'DECREASE')
        return this.prismaService.transaction.update({
            where: {
                id,
            },
            data: updateTransactionDto,
        });
    }

    async remove(id: string) {
        const toDelete = await this.prismaService.transaction.findUnique({
            where: {
                id
            }
        });
        if (toDelete) {
            this.updateBalance(toDelete.amount, 'DECREASE');
        }
        return this.prismaService.transaction.delete({
            where: {
                id
            }
        });
    }

    async balance() {
        return (
            await this.prismaService.balance.findFirst({
                orderBy: { time: 'desc' },
            }) || {
                amount: 0,
                time: new Date(),
                id: 'none',
            }
        );
    }

    private async balanceAmount(): Promise<number> {
        const currentBalance = await this.balance();
        return currentBalance.amount;
    }

    private async updateBalance(
        amount: number,
        operation: 'INCREASE' | 'DECREASE',
    ) {
        const oldBalance = await this.balanceAmount();
        switch (operation) {
            case 'INCREASE':
                this.prismaService.balance.create({
                    data: {
                        amount: oldBalance + amount,
                    },
                });
                break;

            case 'DECREASE':
                this.prismaService.balance.create({
                    data: {
                        amount: oldBalance - amount,
                    },
                });
                break;

            default:
                break;
        }
    }
}
