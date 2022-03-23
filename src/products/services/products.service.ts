import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO, UpdateProductDTO } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository, Between, FindConditions } from 'typeorm';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { FilterProductsDTO } from '../dtos/products.dto';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
        private brandService: BrandsService, private categorieService: CategoriesService,
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async findOne(id: number) {
        const product = await this.productRepository.findOne(id, {
            relations: ['brand', 'categories']
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async findAll(params?: FilterProductsDTO) {
        if (params) {
            const where: FindConditions<Product> = {};
            const { limit, offset, maxPrice, minPrice } = params;
            if (minPrice && maxPrice) {
                where.price = Between(minPrice, maxPrice);
            }
            return await this.productRepository.find({
                relations: ['brand'],
                take: limit,
                skip: offset,
                where
            });
        }
        return await this.productRepository.find({
            relations: ['brand']
        });
    }

    async create(payload: CreateProductDTO) {
        if (await this.findByName(payload.name)) {
            throw new BadGatewayException(`Product ${payload.name} has been taken`);
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
        if (payload.categoriesIds) {
            const categories = await this.categorieService.findByIds(payload.categoriesIds);
            product.categories = categories;
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

    async removeCategoryByProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne(productId, {
            relations: ['categories']
        });
        if (!product) {
            throw new NotFoundException();
        }
        product.categories = product.categories.filter(p => p.id !== categoryId);
        return this.productRepository.save(product);
    }

    async addCategoryToProduct(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne(productId, {
            relations: ['categories']
        });
        if (!product) {
            throw new NotFoundException();
        }
        if (product.categories.some(c => c.id === categoryId)) {
            throw new BadGatewayException(`Product already has category ${categoryId}`);
        }
        const category = await this.categoryRepository.findOne(categoryId);
        if (!category) {
            throw new NotFoundException();
        }
        product.categories.push(category);
        return this.productRepository.save(product);
    }

}
