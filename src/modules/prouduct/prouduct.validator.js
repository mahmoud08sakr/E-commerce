import Joi from "joi";

export const createProuductSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
})



export const getProuductByIdSchema = Joi.object({
id: Joi.string().hex().length(24).required()


});



export const updateProuductSchema = Joi.object({
    title: Joi.string().min(2).max(30).required()
,
    id: Joi.string().hex().length(24).required()
    
    
    });


    export const deleteProuductSchema = Joi.object({
        id: Joi.string().hex().length(24).required()
        
        
        });
        