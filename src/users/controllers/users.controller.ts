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
    @ApiOperation({ summary: 'List of users'})
    getUsers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
        console.log(this.configService.apiKey)
        return {
            msg: 'List users',
            data: this.userService.findAll()
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'List of user'})
    getOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List user',
            data: this.userService.findOne(id)
        };
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'List of orders by user'})
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List user orders',
            data: this.userService.getOrdersByUser(id)
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create user'})
    create(@Body() payload: CreateUserDTO) {
        return {
            msg: 'Create user',
            data: this.userService.create(payload)
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user'})
    update(@Param('id') id: number, @Body() payload: UpdateUserDTO) {
        return {
            id,
            payload
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user'})
    delete(@Param('id') id: number) {
        return {
            msg: 'Delete user',
            id
        }
    }
}
