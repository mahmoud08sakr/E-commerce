import mongoose from "mongoose";




const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
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
            type: Number,
        },
    }],
    totalPrice: {
        type: Number
    },
    discaount: {
        type: Number
    },
    totalPriceAfterDiscount: {
        type: Number
    }

},

    { timestamps: true })

export const cartModel = mongoose.model('cart', cartSchema)
