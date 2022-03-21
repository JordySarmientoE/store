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
                const { user, host, name, password, port } = configService.postgres;
                return {
                    type: 'postgres',
                    host,
                    port: +port,
                    username: user,
                    password,
                    database: name,
                    synchronize: false,
                    autoLoadEntities: true
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
