import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, getOrder ,getAllOrder, onlinePayment } from "./order.controller.js";

const orderRoutes = express.Router();

orderRoutes.post('/:id' ,  protectedRoutes , createCashOrder )

orderRoutes.post('/checkout/:id' ,  protectedRoutes , onlinePayment )



orderRoutes.get('/' ,  protectedRoutes , getOrder )

orderRoutes.get('/getAllOrders' ,  protectedRoutes , getAllOrder )










export default orderRoutes