import express from "express";
import { createProduct, deleteProuduct, getAllProuduct, getAllProuductById, updateProuduct } from "./prouduct.controller.js";
import { validate } from "../../utils/middleware/validation.js";
import { createProuductSchema, deleteProuductSchema, getProuductByIdSchema, updateProuductSchema } from "./prouduct.validator.js";
import { uploadSFiles } from "../../utils/middleware/fileUploades.js";
import {  allowTo, protectedRoutes } from "../auth/auth.controller.js";

const prouductRouter = express.Router();



prouductRouter.route('/').get(getAllProuduct).post( protectedRoutes , allowTo("admin" , "user")  ,uploadSFiles([
    { name: "imgCover ", maxCount: 1 },
    { name: "images", maxCount: 8 }]),  createProduct)


prouductRouter.route('/:id').get(validate(getProuductByIdSchema), getAllProuductById).put(validate(updateProuductSchema), updateProuduct).delete(validate(deleteProuductSchema), deleteProuduct)




export default prouductRouter