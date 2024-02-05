import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;
    @ApiProperty()
    @IsNotEmpty()
    lastName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
        minSymbols: 0,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
    })
    password: string;
}
