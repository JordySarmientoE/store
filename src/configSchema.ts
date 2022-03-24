
import * as Joi from 'joi';

export default Joi.object({
    API_KEY: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    DATABASE: Joi.string().valid('postgres','mysql').required(),
    JWT_SECRET: Joi.string().required(),
    PORT: Joi.number().required()
})