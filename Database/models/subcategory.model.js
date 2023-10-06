import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        uniqe: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'name is too short']

    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    }


}, { timestamps: true }

)


export const subCategoryModule = mongoose.model('subCategory', subCategorySchema)