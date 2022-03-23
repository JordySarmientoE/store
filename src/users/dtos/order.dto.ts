import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDTO {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly customerId: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {
}