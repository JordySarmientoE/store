import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ProductsModule]
})
export class UsersModule {}
