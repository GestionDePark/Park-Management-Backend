import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { EmpolyeeService } from './empolyee.service';
import { CreateEmpolyeeDto } from './dto/create-empolyee.dto';
import { UpdateEmpolyeeDto } from './dto/update-empolyee.dto';

@Controller('empolyee')
export class EmpolyeeController {
    constructor(private readonly empolyeeService: EmpolyeeService) {}

    @Post()
    create(@Body() createEmpolyeeDto: CreateEmpolyeeDto) {
        return this.empolyeeService.create(createEmpolyeeDto);
    }

    @Get()
    findAll() {
        return this.empolyeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.empolyeeService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateEmpolyeeDto: UpdateEmpolyeeDto,
    ) {
        return this.empolyeeService.update(+id, updateEmpolyeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.empolyeeService.remove(+id);
    }
}
