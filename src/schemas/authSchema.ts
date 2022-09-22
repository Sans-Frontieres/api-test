import Joi from 'joi'

const username = Joi.string().min(5).max(15)
const email = Joi.string().email().required();
const password = Joi.string()
    .pattern(/[a-zA-Z0-9]{3,30}$/)
    .required();

export const signUp = Joi.object({
    username: username.required(),
    email,
    password
})

export const login = Joi.object({
    email,
    password
})

