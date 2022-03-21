import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        apiKey: process.env.API_KEY,
        port: process.env.PORT,
        postgres: {
            name: process.env.POSTGRES_DB,
            port: process.env.POSTGRES_PORT,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER
        },
        mysql: {
            name: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT,
            password: process.env.MYSQL_ROOT_PASSWORD,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER
        },
        database: process.env.DATABASE
    }
})