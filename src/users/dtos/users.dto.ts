import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({description: 'User email'})
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @Min(5)
    @ApiProperty({description: 'User password'})
    readonly password: string;
    @IsNumber()
    @IsNotEmpty()
    @IsIn(['ADMIN', 'USER'])
    @ApiProperty({description: 'User role'})
    readonly role: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
}