import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
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
    image:String ,



},{timestamps:true})

categorySchema.post('init' , (doc) =>{
    console.log(doc.name , "askfh");
doc.image = "http://localhost:3000/category/"+ doc.image;
} )




export const categoryModule = mongoose.model('Category', categorySchema)