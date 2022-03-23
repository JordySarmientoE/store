import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDTO {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly orderId: number;
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly productId: number;
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly quantity: number;
}

export class UpdateOrderItemDTO extends PartialType(CreateOrderItemDTO) {
}