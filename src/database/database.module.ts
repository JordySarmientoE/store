import { Global, Module } from '@nestjs/common';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '1234567';
const API_KEY_PROD = '7654321';


@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const DATABASE_URL = configService.DATABASE_URL;
                return {
                    type: 'postgres',
                    url: DATABASE_URL,
                    synchronize: false,
                    autoLoadEntities: true,
                    ssl: {
                        rejectUnauthorized: false 
                    }
                }
            }
        })
    ],
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
        }
    ],
    exports: ['API_KEY', TypeOrmModule]
})
export class DatabaseModule { }
