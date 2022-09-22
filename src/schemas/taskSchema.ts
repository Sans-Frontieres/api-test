import Joi from "joi";

const title = Joi.string().min(5).max(25)
const description = Joi.string().min(10)

export const create = Joi.object({
    title: title.required(),
    description: description.required()
})

export const update = Joi.object({
    title,
    description
})

