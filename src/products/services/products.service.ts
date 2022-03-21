import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO, UpdateProductDTO } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
        private brandService: BrandsService, private categorieService: CategoriesService,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>) { }

    async findOne(id: number) {
        const product = await this.productRepository.findOne(id, {
            relations: ['brand','categories']
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async findAll() {
        return await this.productRepository.find({
            relations: ['brand']
        });
    }

    async create(payload: CreateProductDTO) {
        if (await this.findByName(payload.name)) {
            throw new BadGatewayException();
        }
        const newProduct = this.productRepository.create(payload);
        if (payload.brandId) {
            const brand = await this.brandRepository.findOne(payload.brandId);
            if (!brand) {
                throw new NotFoundException('Brand not found')
            }
            newProduct.brand = brand;
        }
        if (payload.categoriesIds) {
            const categories = await this.categorieService.findByIds(payload.categoriesIds);
            newProduct.categories = categories;
        }
        return await this.productRepository.save(newProduct);
    }

    async update(id: number, payload: UpdateProductDTO) {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException();
        }
        if (payload.brandId) {
            const brand = await this.brandService.findOne(payload.brandId);
            if (!brand) {
                throw new NotFoundException('Brand not found')
            }
            product.brand = brand;
        }
        this.productRepository.merge(product, payload);
        return await this.productRepository.save(product)
    }

    async delete(id: number) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.productRepository.delete(id)
    }

    async findByName(name: string) {
        const product = await this.productRepository.findOne({ name });
        return product;
    }

}
