import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly price: number;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly stock: number;
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty()
    readonly image: string;
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly brandId: number;
    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    readonly categoriesIds: number[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
}