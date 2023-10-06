import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import{deleteFromWishList, getAllWishLists, updateWishList}  from './wishList.controller.js'

const wishListRouter = express.Router();



    wishListRouter.route('/')
    .get(protectedRoutes ,getAllWishLists)
    .put( protectedRoutes,updateWishList)
    .delete( protectedRoutes , deleteFromWishList)





export default wishListRouter