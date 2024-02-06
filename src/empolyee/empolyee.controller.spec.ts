import { Test, TestingModule } from '@nestjs/testing';
import { EmpolyeeController } from './empolyee.controller';
import { EmpolyeeService } from './empolyee.service';

describe('EmpolyeeController', () => {
    let controller: EmpolyeeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmpolyeeController],
            providers: [EmpolyeeService],
        }).compile();

        controller = module.get<EmpolyeeController>(EmpolyeeController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
