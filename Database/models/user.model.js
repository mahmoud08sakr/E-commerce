// import { verify } from "jsonwebtoken";
import { hashSync } from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        uniqe: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'name is too short']

    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        uniqe: [true, 'email is unique '],

    },
    password: {
        type: String,
        minLength: [3, 'password is too short'],
        required: [true, 'password is required'],


    },
    phone: {
        type: String,
        required: [true, 'phone is required'],

    },

    changePasswordAt: Date,

    profPicture: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    wishList: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product"
    }

    ,
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true }

)


userSchema.pre('save', function () {
    this.password = hashSync(this.password, 7)
})


// userSchema.pre('findOneAndUpdate', function () {
//     this.password = hashSync(this.password, 7)
//     console.log(this);
// })



export const userModule = mongoose.model('user', userSchema)