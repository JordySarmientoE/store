import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    @Get(':categoryId/products/:productId')
    getCategory(@Param('productId') productId: string, @Param('categoryId') categoryId: string): string {
        return `category ${categoryId}, product ${productId}`;
    }
}
