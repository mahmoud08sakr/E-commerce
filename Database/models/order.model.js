import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId
        ,
        ref: "user"
    },
    cartItem: [{
        prouduct:
        {
            type: mongoose.Types.ObjectId,
            ref: "prouduct"
        }
        ,
        quantity: {
            type: Number,
            default: 1
        }, price: {
            types: Number
        },
    }],
    totalOrderPrice: Number,
    totalOrderPriceAfterDiscount: Number,
    paymentMethod:{
        type: String,
        enum: ["cash", "credit"],
        default: 'cash'
    },
    shippingAddress: {
        city:String,
        street:String
    }, 
    discount: Number,
    isPaid: Boolean,
    paidAt: Date,
    isDeliverd: Boolean

},{ timestamps: true }
)

export const orderModel = mongoose.model('order', orderSchema)