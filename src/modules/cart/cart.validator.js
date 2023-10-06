import Joi from "joi";

export const createBrandSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
})



export const getBrandByIdSchema = Joi.object({
id: Joi.string().hex().length(24).required()
});





export const updateBrandSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    id: Joi.string().hex().length(24).required()
    
    
    });


    export const deleteBrandSchema = Joi.object({
        id: Joi.string().hex().length(24).required()
        });
        