import express from "express";
import { createCategory, deleteCategory, getAllCategories, getAllCategoryById, updateCategory } from "./category.controller.js";
import SubCategoryRoute from "../supcategory/supCategory.routes.js";
import { validate } from "../../utils/middleware/validation.js";
import { getCategoryByIdSchema, createCategorySchema, updateCategoruSchema, deleteCategorySchema } from "./category.validator.js";
import multer from "multer";
import { uploadSingleFile } from "../../utils/middleware/fileUploades.js";

const categoryRoute = express.Router();







categoryRoute.use('/:id/subCategory', SubCategoryRoute)

categoryRoute.route('/').get(getAllCategories).post(  uploadSingleFile("category" , "image") , validate(createCategorySchema), createCategory)

categoryRoute.route('/:id').get(validate(getCategoryByIdSchema), getAllCategoryById).put(validate(updateCategoruSchema), updateCategory).delete(validate(deleteCategorySchema), deleteCategory)





export default categoryRoute