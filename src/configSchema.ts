
import * as Joi from 'joi';

export default Joi.object({
    API_KEY: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    /* MYSQL_DATABASE: Joi.string().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_ROOT_PASSWORD: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_HOST: Joi.string().required(), */
    DATABASE: Joi.string().valid('postgres','mysql').required(),
    JWT_SECRET: Joi.string().required(),
    PORT: Joi.number().required()
})