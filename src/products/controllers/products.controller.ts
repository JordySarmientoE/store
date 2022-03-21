import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, HttpCode
} from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from 'src/products/dtos/products.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe'
import { ProductsService } from '../services/products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @Get()
    async getProducts() {
        return {
            msg: 'List products',
            data: await this.productService.findAll()
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
}
