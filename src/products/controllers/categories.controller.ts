import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) { }

    @Public()
    @Get()
    @ApiOperation({ summary: 'List of categories' })
    async getUsers() {
        return {
            msg: 'List categories',
            data: await this.categoryService.findAll()
        }
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'List of category' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List category',
            data: await this.categoryService.findOne(id)
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create category' })
    async create(@Body() payload: CreateCategoryDTO) {
        return {
            msg: 'Create category',
            data: await this.categoryService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCategoryDTO) {
        return {
            msg: 'Update category',
            data: await this.categoryService.update(id, payload)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete category' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.categoryService.delete(id)
        return {
            msg: 'Delete category'
        }
    }

    @Get(':categoryId/products/:productId')
    getCategory(@Param('productId') productId: string, @Param('categoryId') categoryId: string): string {
        return `category ${categoryId}, product ${productId}`;
    }
}
