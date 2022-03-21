import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString, IsPositive, IsOptional, MinLength } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({description: 'User email'})
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({description: 'User password'})
    readonly password: string;
    @IsString()
    @IsNotEmpty()
    @IsIn(['ADMIN','USER'])
    @ApiProperty({description: 'User role'})
    readonly role: string;
    @IsOptional()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({description: 'User customerId'})
    readonly customerId: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
}