import mongoose from "mongoose";


const prouductSchema = mongoose.Schema({
    title: {
        type: String,
        uniqe: [true, 'product is required'],
        trim: true,
        required: true,
        minLength: [2, 'name is too short']

    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },

    price: {
        type: Number,
        min: 0,
        required: [true, 'price is required'],

    },
    ratingAverage: {
        type: Number,
        min: [0, 'rating average must be grater than 1'],
        max: [5, 'rating average must be less than 5'],

    },
    ratingCount: {
        type: Number,
        default: 0,
        min: 0
    },

    priceAfterDisc: {
        type: Number,
        min: 0,

    },



    descreption: {
        type: String,
        minLength: [5, 'descreption is too short'],
        maxLength: [300, 'descreption is too long'],
        required: [true, 'proud description is required'],
        trim: true,


    },


    quantity: {

        type: Number,
        default: 0,
        min: 0,
        required: [true, 'quantity  is required'],

    },

    sold: {
        type: Number,
        default: 0,
        min: 0,
    },

    imgCover: String,
    images: [String],

    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: [true, 'proucut category required'],
    },
    subCategory: {

        type: mongoose.Types.ObjectId,
        ref: "supCategory",
        required: [true, ' supcategory is required'],
    }
    ,
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "brand",
        required: [true, ' brand is  required'],

    }





}, { timestamps: true , toJSON: { virtual :true} , toObject :{ virtual :true}}

)












prouductSchema.virtual('Myreviews', {
    ref: 'review',
    localField: "_id",
    foreignField: "prouduct"
})

    

prouductSchema.pre (/^find/ , function () {
    this.populate("Myreviews")
})

export const prouductModule = mongoose.model('prouduct', prouductSchema)