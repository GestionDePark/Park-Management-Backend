import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @ApiProperty()
    @Column()
    firstName: string;
    @ApiProperty()
    @Column()
    lastName: string;
    @ApiProperty()
    @Column()
    email: string;
    @ApiProperty()
    @Column()
    password: string;
    @ApiProperty()
    @Column({ default: false })
    isAdmin: boolean;
}
