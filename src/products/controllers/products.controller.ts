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
    getProducts(@Query('limit') limit = 100, @Query('offset') offset = 0, @Query('brand') brand: string) {
        return {
            msg: 'List products',
            data: this.productService.findAll()
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List product',
            data: this.productService.findOne(id)
        };
    }

    @Post()
    create(@Body() payload: CreateProductDTO) {
        return {
            msg: 'Create product',
            data: this.productService.create(payload)
        }
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: UpdateProductDTO) {
        return {
            id,
            payload
        }
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return {
            msg: 'Delete product',
            id
        }
    }
}
