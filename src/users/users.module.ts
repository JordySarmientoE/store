import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])]
})
export class UsersModule {}
