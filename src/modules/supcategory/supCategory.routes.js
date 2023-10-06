import express  from "express";
import { createSubCategory, deletecSubCategory, getSubCategories, getAllSubCategoryById, updateSubCategory, getAllSubCategories } from "./supCategory.controller.js";
import { validate } from "../../utils/middleware/validation.js";
import { createSupCategorySchema, deleteSupCategorySchema, getSupCategoryByIdSchema, updateSupCategorySchema } from "./supcategory.validator.js";

const SubCategoryRoute = express.Router({mergeParams:true});


SubCategoryRoute.route('/').get(getSubCategories).post( validate(createSupCategorySchema) , createSubCategory)

SubCategoryRoute.get('/getAll' , getAllSubCategories)



SubCategoryRoute.route('/:id').get( validate(getSupCategoryByIdSchema)  , getAllSubCategoryById).put( validate(updateSupCategorySchema) ,updateSubCategory).delete( validate(deleteSupCategorySchema) , deletecSubCategory)






export default SubCategoryRoute