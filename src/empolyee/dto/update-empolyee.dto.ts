import { PartialType } from '@nestjs/swagger';
import { CreateEmpolyeeDto } from './create-empolyee.dto';

export class UpdateEmpolyeeDto extends PartialType(CreateEmpolyeeDto) {}
