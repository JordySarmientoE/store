import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brand.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandService: BrandsService) { }

    @Public()
    @Get()
    @ApiOperation({ summary: 'List of brands' })
    async getUsers() {
        return {
            msg: 'List brands',
            data: await this.brandService.findAll()
        }
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'List of brand' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List brand',
            data: await this.brandService.findOne(id)
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create brand' })
    async create(@Body() payload: CreateBrandDTO) {
        return {
            msg: 'Create brand',
            data: await this.brandService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update brand' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDTO) {
        return {
            msg: 'Update brand',
            data: await this.brandService.update(id, payload)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete brand' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.brandService.delete(id)
        return {
            msg: 'Delete brand'
        }
    }
}
