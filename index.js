import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import {connection} from './Database/connection/connecction.js'
import categoryRoute from "./src/modules/category/categories.routes.js";
import morgan from "morgan";
import appError from "./src/utils/appError.js";
import glopalErrorHandel from "./src/utils/middleware/glopalErrorHandel.js";
import SubCategoryRoute from "./src/modules/supcategory/supCategory.routes.js";
import brandRouter from "./src/modules/brands/brands.routes.js";
import prouductRouter from "./src/modules/prouduct/prouduct.routes.js";
import userRoutes from "./src/modules/user/user.routes.js";
import reviewRoutes from "./src/modules/review/review.routes.js";
import wishListRouter from "./src/modules/wishList/wishList.routes.js";
import couponeRoutes from "./src/modules/coupone/coupone.routes.js";
import cartRoutes from "./src/modules/cart/cart.routes.js";
import orderRoutes from "./src/modules/order/order.routes.js";
dotenv.config();

const app = express();
const port = 3000 ;
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())



app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/SubCategory',SubCategoryRoute)
app.use('/api/v1/Brands', brandRouter )  
app.use('/api/v1/Prouduct', prouductRouter )  
app.use('/api/v1/user', userRoutes )  
app.use('/api/v1/review', reviewRoutes ) 
app.use('/api/v1/wishList', wishListRouter ) 
app.use('/api/v1/coupone', couponeRoutes )
app.use('/api/v1/cart', cartRoutes ) 
app.use('/api/v1/order', orderRoutes ) 
app.use(express.static("uploads"))
app.use(express.urlencoded({extended:true}))




app.use("*", (req, res , next) => {

    next(new appError(`cannot found this route: ${req.originalUrl}` , 404))
    res.status(400).json(`invalid url , ${req.originalUrl}`)

})
app.use(glopalErrorHandel)


app.listen(process.env.PORT ||  port , () =>{
    console.log("connectted to the server");
} )

connection()
