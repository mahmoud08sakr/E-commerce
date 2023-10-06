import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
})



export const getCategoryByIdSchema = Joi.object({
id: Joi.string().hex().length(24).required()


});


export const updateCategoruSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
,
    id: Joi.string().hex().length(24).required()
    
    
    });


    
export const deleteCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required()
    
    
    });