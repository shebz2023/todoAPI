import joi from 'joi';

export const todoVal = joi.object({
    title:joi.string().min(3),
    content:joi.string().min(5),
    completed:joi.string()
}).unknown(false);