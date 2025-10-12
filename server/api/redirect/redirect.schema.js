import Joi from "joi";

export const redirectionSchema = Joi.object()
    .keys({
        shortCode: Joi.string().required(),
})