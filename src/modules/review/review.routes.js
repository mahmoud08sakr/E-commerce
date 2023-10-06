import express from "express";
import { createReview, deleteReview, getAllReviewById, getAllReviews, updateReview } from "./review.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const reviewRoutes = express.Router();







reviewRoutes.route('/')
    .get(getAllReviews)
    .post( protectedRoutes ,createReview)


    reviewRoutes.route('/:id').get( getAllReviewById)
    .put( protectedRoutes,updateReview)
    .delete( deleteReview)





export default reviewRoutes