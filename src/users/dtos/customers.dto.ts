import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Customer name'})
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Customer lastName'})
    readonly lastName: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Customer phone'})
    readonly phone;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {
}