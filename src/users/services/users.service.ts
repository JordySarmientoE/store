import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { ProductsService } from '../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {

    constructor(private productService: ProductsService, @InjectRepository(User) private userRepository: Repository<User>,
        private customerService: CustomersService) { }

    async findOne(id: number) {
        const user = await this.userRepository.findOne(id, {
            relations: ['customer']
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findAll() {
        return await this.userRepository.find({
            relations: ['customer']
        });
    }

    async create(payload: CreateUserDTO) {
        if (await this.findByEmail(payload.email)) {
            throw new BadGatewayException();
        }
        const newUser = this.userRepository.create(payload);
        if (payload.customerId) {
            const customer = await this.customerService.findOne(payload.customerId);
            if(!customer){
                throw new NotFoundException('Customer not found');
            }
            newUser.customer = customer;
        }
        return await this.userRepository.save(newUser);
    }

    async update(id: number, payload: UpdateUserDTO) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }
        this.userRepository.merge(user, payload);
        return await this.userRepository.save(user)
    }

    async delete(id: number) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.userRepository.delete(id);
    }

    async getOrdersByUser(id: number) {
        const user = await this.findOne(id);
        return {
            date: new Date(),
            user,
            products: await this.productService.findAll()
        }
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });
        return user;
    }
}
