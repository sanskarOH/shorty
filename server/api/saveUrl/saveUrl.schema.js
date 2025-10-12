import Joi from "joi";


export const urlSaveSchema = Joi.object().keys({
    mainUrl : Joi.string().uri().required(),
    shortCode: Joi.string()
})

