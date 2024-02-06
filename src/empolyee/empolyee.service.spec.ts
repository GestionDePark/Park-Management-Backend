import { Test, TestingModule } from '@nestjs/testing';
import { EmpolyeeService } from './empolyee.service';

describe('EmpolyeeService', () => {
    let service: EmpolyeeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EmpolyeeService],
        }).compile();

        service = module.get<EmpolyeeService>(EmpolyeeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
