import { Controller, Get, Query, Param, Post, Body, Put, Delete, Inject } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { ConfigType } from '@nestjs/config';
import config from '../../config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, @Inject(config.KEY) private configService: ConfigType<typeof config>) { }

    @Get()
    @ApiOperation({ summary: 'List of users' })
    async getUsers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
        return {
            msg: 'List users',
            data: await this.userService.findAll()
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'List of user' })
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List user',
            data: await this.userService.findOne(id)
        };
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'List of orders by user' })
    async getOrders(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List user orders',
            data: await this.userService.getOrdersByUser(id)
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() payload: CreateUserDTO) {
        return {
            msg: 'Create user',
            data: await this.userService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDTO) {
        return {
            msg: 'Update user',
            data: await this.userService.update(id, payload)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.userService.delete(id)
        return {
            msg: 'Delete user'
        }
    }
}
