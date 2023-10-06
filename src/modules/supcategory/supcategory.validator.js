import Joi from "joi";

export const createSupCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    categoryId:Joi.string().hex().length(24).required()
})



export const getSupCategoryByIdSchema = Joi.object({
id: Joi.string().hex().length(24).required()


});



export const updateSupCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    categoryId:Joi.string().hex().length(24).required(),
    id: Joi.string().hex().length(24).required()
    
    
    });


    export const deleteSupCategorySchema = Joi.object({
        id: Joi.string().hex().length(24).required()
        
        
        });
        