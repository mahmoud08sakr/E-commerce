import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import { createCoupon, deleteCoupon, getAllCouponById, getAllCoupons, updateCoupon } from "./coupone.controller.js";

const couponeRoutes = express.Router();







couponeRoutes.route('/')
    .get(getAllCoupons)
    .post( protectedRoutes ,createCoupon)


    couponeRoutes.route('/:id').get( getAllCouponById)
    .put( protectedRoutes,updateCoupon)
    .delete( deleteCoupon)





export default couponeRoutes