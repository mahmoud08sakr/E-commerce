import express from "express";
// import SubCategoryRoute from "../supcategory/supCategory.routes.js";
import { createBrand, deleteBrand, getAllBrandById, getAllBrands, updateBrand } from "./brands.controller.js";
import { validate } from "../../utils/middleware/validation.js";
import { createBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./brand.validator.js";
import { uploadSingleFile } from "../../utils/middleware/fileUploades.js";

const brandRouter = express.Router();






// categoryRoute.use('/:id/subCategory' , SubCategoryRoute)

brandRouter.route('/')
    .get(getAllBrands)
    .post(uploadSingleFile("brand", 'logo')
        , validate(createBrandSchema), createBrand)


brandRouter.route('/:id').get(validate(getBrandByIdSchema), getAllBrandById)
    .put(validate(updateBrandSchema), updateBrand)
    .delete(validate(deleteBrandSchema), deleteBrand)





export default brandRouter