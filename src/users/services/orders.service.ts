import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Customer) private customerRepository: Repository<Customer>) { }

    async findAll() {
        return await this.orderRepository.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne(id, {
            relations: ['items','items.product']
        });
        if (!order) {
            throw new NotFoundException('Order not found')
        }
        return order;
    }

    async create(payload: CreateOrderDTO) {
        const order = new Order();
        if (payload.customerId) {
            const customer = await this.customerRepository.findOne(payload.customerId);
            if (!customer) {
                throw new NotFoundException('Customer not found')
            }
            order.customer = customer;
        }
        return await this.orderRepository.save(order);
    }

    async update(id: number, payload: UpdateOrderDTO) {
        const order = await this.orderRepository.findOne(id);
        if (payload.customerId) {
            const customer = await this.customerRepository.findOne(payload.customerId);
            if (!customer) {
                throw new NotFoundException('Customer not found')
            }
            order.customer = customer;
        }
        return await this.orderRepository.save(order);
    }

    async delete(id: number){
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.orderRepository.delete(id);
    }
}
