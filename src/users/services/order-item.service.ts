import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrderItem) private itemRepository: Repository<OrderItem>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>) { }

    async create(payload: CreateOrderItemDTO) {
        const order = await this.orderRepository.findOne(payload.orderId);
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        const product = await this.productRepository.findOne(payload.productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        const item = new OrderItem();
        item.order = order;
        item.product = product;
        item.quantity = payload.quantity;
        return await this.itemRepository.save(item);
    }

    async update(id: number, payload: UpdateOrderItemDTO) {
        const item = await this.itemRepository.findOne(id);
        if(!item){
            throw new NotFoundException('Order Item not found');
        }
        if(payload.productId){
            const product = await this.productRepository.findOne(payload.productId);
            if(!product){
                throw new NotFoundException('Product not found');
            }
            item.product = product;
        }
        if(payload.orderId){
            const order = await this.orderRepository.findOne(payload.orderId);
            if(!order){
                throw new NotFoundException('Order not found');
            }
            item.order = order;
        }
        return await this.itemRepository.save(item);
    }

    async findOne(id: number){
        const item = await this.itemRepository.findOne(id);
        if(!item){
            throw new NotFoundException('Order Item not found');
        }
        return item;
    }

    async delete(id: number){
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.itemRepository.delete(id);
    }
}
