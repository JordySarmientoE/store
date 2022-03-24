import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from '../services/customers.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { UpdateCustomerDTO, CreateCustomerDTO } from '../dtos/customers.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) { }

    @Get()
    @ApiOperation({ summary: 'List of customers' })
    async getUsers() {
        return {
            msg: 'List customers',
            data: await this.customerService.findAll()
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'List of user' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List customer',
            data: await this.customerService.findOne(id)
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create customer' })
    async create(@Body() payload: CreateCustomerDTO) {
        return {
            msg: 'Create customer',
            data: await this.customerService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update customer' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomerDTO) {
        return {
            msg: 'Update customer',
            data: await this.customerService.update(id, payload)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.customerService.delete(id)
        return {
            msg: 'Delete customer'
        }
    }
}
