import { Injectable } from '@nestjs/common';
import { CreateEmpolyeeDto } from './dto/create-empolyee.dto';
import { UpdateEmpolyeeDto } from './dto/update-empolyee.dto';

@Injectable()
export class EmpolyeeService {
    create(createEmpolyeeDto: CreateEmpolyeeDto) {
        return 'This action adds a new empolyee';
    }

    findAll() {
        return `This action returns all empolyee`;
    }

    findOne(id: number) {
        return `This action returns a #${id} empolyee`;
    }

    update(id: number, updateEmpolyeeDto: UpdateEmpolyeeDto) {
        return `This action updates a #${id} empolyee`;
    }

    remove(id: number) {
        return `This action removes a #${id} empolyee`;
    }
}
