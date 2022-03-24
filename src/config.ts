import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        apiKey: process.env.API_KEY,
        port: process.env.PORT,
        postgres: {
            DATABASE_URL: process.env.DATABASE_URL
        },
        mysql: {
            name: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT,
            password: process.env.MYSQL_ROOT_PASSWORD,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER
        },
        database: process.env.DATABASE,
        jwt_key: process.env.JWT_SECRET
    }
})