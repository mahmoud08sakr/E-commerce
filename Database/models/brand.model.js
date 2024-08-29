import mongoose from "mongoose";









const brandSchema = mongoose.Schema({
    name:{
        type: String,
        uniqe:[true , 'name is required'],
        trim: true,
        required:true,
        minLength: [2,'name is too short']

    },
    slug:{
        type: String,
        lowercase: true,
        required:true
    },
    logo:String

},{timestamps:true}

)


export const brandModule = mongoose.model('brand', brandSchema)
