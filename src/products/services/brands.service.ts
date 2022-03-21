import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
    constructor(@InjectRepository(Brand) private brandRepository: Repository<Brand>) { }

    async findOne(id: number) {
        const brand = await this.brandRepository.findOne(id, {
            relations: ['products']
        });
        if (!brand) {
            throw new NotFoundException('Brand not found');
        }
        return brand;
    }

    async findAll() {
        return await this.brandRepository.find();
    }

    async create(payload: CreateBrandDTO) {
        const newBrand = this.brandRepository.create(payload);
        return await this.brandRepository.save(newBrand);
    }

    async update(id: number, payload: UpdateBrandDTO) {
        const brand = await this.brandRepository.findOne(id);
        if (!brand) {
            throw new NotFoundException();
        }
        this.brandRepository.merge(brand, payload);
        return await this.brandRepository.save(brand)
    }

    async delete(id: number){
        if (!(await this.findOne(id))) {
            throw new NotFoundException();
        }
        return await this.brandRepository.delete(id);
    }
}
