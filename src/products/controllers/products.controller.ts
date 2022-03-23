import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode
} from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from 'src/products/dtos/products.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe'
import { ProductsService } from '../services/products.service';
import { ApiTags } from '@nestjs/swagger';
import { FilterProductsDTO } from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @Get()
    async getProducts(@Query() params: FilterProductsDTO) {
        return {
            msg: 'List products',
            data: await this.productService.findAll(params)
        }
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List product',
            data: await this.productService.findOne(id)
        };
    }

    @Post()
    async create(@Body() payload: CreateProductDTO) {
        return {
            msg: 'Create product',
            data: await this.productService.create(payload)
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDTO) {
        return {
            message: 'Update product',
            data: await this.productService.update(id, payload)
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.productService.delete(id);
        return {
            msg: 'Delete product'
        }
    }

    @Delete(':id/category/:categoryId')
    async deleteCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
        return {
            msg: 'Delete category on product',
            data: await this.productService.removeCategoryByProduct(id, categoryId)
        }
    }

    @Put(':id/category/:categoryId')
    async addCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
        return {
            msg: 'Add category on product',
            data: await this.productService.addCategoryToProduct(id, categoryId)
        }
    }
}
