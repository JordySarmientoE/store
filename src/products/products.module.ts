import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, CategoriesService, BrandsService],
    exports: [ProductsService, TypeOrmModule]
})
export class ProductsModule { }
