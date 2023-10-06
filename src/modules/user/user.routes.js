// import express from "express";
// import { userModule } from "../../../Database/models/user.model.js";
import express from "express";
import {  deleteUser, getAllUserById, getAllUsers, updateUser, changePassword } from "./user.controller.js";
import { validate } from "../../utils/middleware/validation.js";
import { signIn, signUp } from "../auth/auth.controller.js";




const userRoutes = express.Router()



userRoutes.route('/')
    .get(getAllUsers)
    .post(signUp )
userRoutes.post('/signIn', signIn)
userRoutes.post('/changePassword/:id', changePassword)



userRoutes.route('/:id').get( getAllUserById)
    .put( updateUser)
    .delete(deleteUser)









export default userRoutes