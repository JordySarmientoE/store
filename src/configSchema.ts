
import * as Joi from 'joi';

export default Joi.object({
    API_KEY: Joi.number().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_HOST: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_ROOT_PASSWORD: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_HOST: Joi.string().required(),
    DATABASE: Joi.string().valid('postgres','mysql').required()
})