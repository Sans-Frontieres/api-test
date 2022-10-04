import Joi from 'joi'

export const changeRole = Joi.object({
    userId: Joi.string().required(),
    role: Joi.number().required(),
})
