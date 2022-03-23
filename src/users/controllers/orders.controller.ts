import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { UpdateOrderDTO, CreateOrderDTO } from '../dtos/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrdersService){}

    @Get()
    @ApiOperation({ summary: 'List of orders' })
    async getUsers() {
        return {
            msg: 'List orders',
            data: await this.orderService.findAll()
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'List order' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List order',
            data: await this.orderService.findOne(id)
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create order' })
    async create(@Body() payload: CreateOrderDTO) {
        return {
            msg: 'Create order',
            data: await this.orderService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update order' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateOrderDTO) {
        return {
            msg: 'Update order',
            data: await this.orderService.update(id, payload)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete order' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.orderService.delete(id)
        return {
            msg: 'Delete order'
        }
    }
}
