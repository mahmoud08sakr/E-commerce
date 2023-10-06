import mongoose from "mongoose";


const couponSchema = mongoose.Schema({
    code: {
        trim: true,
        required: [true, "code is required"],
        type: String,
        unique: true,
    },
    discount: {
        type: Number,
        min: 0,
        required: [true, "discount is required"]
    },
    expires: {
        type: Date,
        required: [true , "expires date is required"]
    }
})



export const couponModel = mongoose.model('compone' , couponSchema)