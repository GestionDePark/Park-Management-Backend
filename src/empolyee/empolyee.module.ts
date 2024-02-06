import { Module } from '@nestjs/common';
import { EmpolyeeService } from './empolyee.service';
import { EmpolyeeController } from './empolyee.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [EmpolyeeController],
    providers: [EmpolyeeService],
})
export class EmpolyeeModule {}
