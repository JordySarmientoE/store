import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {

    constructor(private productService: ProductsService) { }

    private counter = 1;
    private users: User[] = [
        {
            id: 1,
            email: "jordysarmiento@gmail.com",
            password: "sadsad",
            role: 'ADMIN'
        }
    ]

    findOne(id: number) {
        const users = this.users.find(u => u.id === id);
        if (!users) {
            throw new NotFoundException('User not found');
        }
        return users;
    }

    findAll() {
        return this.users;
    }

    create(payload: CreateUserDTO) {
        this.counter = this.counter + 1;
        const newUser = {
            id: this.counter,
            ...payload
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, payload: UpdateUserDTO) {

    }

    getOrdersByUser(id: number) {
        const user = this.findOne(id);
        return {
            date: new Date(),
            user,
            products: this.productService.findAll()
        }
    }
}
