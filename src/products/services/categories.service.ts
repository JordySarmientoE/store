import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOne(id, {
            relations: ['products']
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    async findAll() {
        return await this.categoryRepository.find();
    }

    async create(payload: CreateCategoryDTO) {
        const newCategory = this.categoryRepository.create(payload);
        return await this.categoryRepository.save(newCategory);
    }

    async update(id: number, payload: UpdateCategoryDTO) {
        const category = await this.categoryRepository.findOne(id);
        if (!category) {
            throw new NotFoundException();
        }
        this.categoryRepository.merge(category, payload);
        return await this.categoryRepository.save(category)
    }

    async delete(id: number) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.categoryRepository.delete(id);
    }

    async findByIds(id: number[]) {
        return await this.categoryRepository.findByIds(id);
    }
}
