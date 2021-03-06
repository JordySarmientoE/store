import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import { AuthModule } from './auth/auth.module';
import config from './config';
import configSchema from './configSchema';

@Module({
  imports: [UsersModule, ProductsModule, DatabaseModule, ConfigModule.forRoot({
    envFilePath: environments[process.env.NODE_ENV] || '.env',
    isGlobal: true,
    load: [config],
    validationSchema: configSchema
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
