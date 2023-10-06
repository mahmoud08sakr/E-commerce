import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import { applyCoupone, createCart ,deleteItem,getAllCart, updateCart } from "./cart.controller.js";

const cartRoutes = express.Router();



cartRoutes.get("/" , protectedRoutes, getAllCart)
cartRoutes.get("/applyCoupone/:id" , protectedRoutes, applyCoupone)



cartRoutes.post("/" , protectedRoutes, createCart)
cartRoutes.delete("/:id" , protectedRoutes, deleteItem)

cartRoutes.put("/:id" , protectedRoutes, updateCart)



updateCart

export default cartRoutes