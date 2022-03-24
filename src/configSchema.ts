
import * as Joi from 'joi';

export default Joi.object({
    API_KEY: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    PORT: Joi.number().required()
})