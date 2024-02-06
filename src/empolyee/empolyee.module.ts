import { Module } from '@nestjs/common';
import { EmpolyeeService } from './empolyee.service';
import { EmpolyeeController } from './empolyee.controller';

@Module({
    controllers: [EmpolyeeController],
    providers: [EmpolyeeService],
})
export class EmpolyeeModule {}
