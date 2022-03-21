import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
    constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) { }

    async findOne(id: number) {
        const customer = await this.customerRepository.findOne(id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        return customer;
    }

    async findAll() {
        return await this.customerRepository.find();
    }

    async create(payload: CreateCustomerDTO) {
        const newCustomer = this.customerRepository.create(payload);
        return await this.customerRepository.save(newCustomer);
    }

    async update(id: number, payload: UpdateCustomerDTO) {
        const customer = await this.customerRepository.findOne(id);
        if (!customer) {
            throw new NotFoundException();
        }
        this.customerRepository.merge(customer, payload);
        return await this.customerRepository.save(customer)
    }

    async delete(id: number) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.customerRepository.delete(id);
    }
}
