import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {
}