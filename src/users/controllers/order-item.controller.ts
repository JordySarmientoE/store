import { Controller, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemDTO } from '../dtos/order-item.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
    
    constructor(private orderItemService: OrderItemService){}

    @Post()
    @ApiOperation({ summary: 'Create order item' })
    async create(@Body() payload: CreateOrderItemDTO) {
        return {
            msg: 'Create order item',
            data: await this.orderItemService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update order item' })
    async update(@Body() payload: CreateOrderItemDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'Update order item',
            data: await this.orderItemService.update(id, payload)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete order item' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await await this.orderItemService.delete(id);
        return {
            msg: 'Delete order item'
        }
    }
}
