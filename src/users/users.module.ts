import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
  controllers: [UsersController, CustomersController, OrdersController, OrderItemController],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order, OrderItem])]
})
export class UsersModule {}
