import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBrandDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;
    @IsNotEmpty()
    @ApiProperty()
    @IsUrl()
    readonly image: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {
}