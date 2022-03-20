import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
    private counter = 1;
    private products: Product[] = [
        {
            id: 1,
            name: 'Lapicero',
            description: 'Lapicero Gratis',
            price: 122,
            image: '',
            stock: 15
        }
    ]

    findOne(id: number) {
        const product = this.products.find(p => p.id === id);
        if(!product){
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    findAll() {
        return this.products;
    }

    create(payload: CreateProductDTO) {
        this.counter = this.counter + 1;
        const newProduct = {
            id: this.counter,
            ...payload
        }
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: UpdateProductDTO){
        
    }

}
