import slugify from 'slugify';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import { subCategoryModule } from '../../../Database/models/subcategory.model.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';





export const createSubCategory = handelingError(async (req, res, next) => {
    const { name ,categoryId } = req.body;
    try {
        const existingCategory = await subCategoryModule.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ message: " sub Category name already exists." });
        }

        const result = new subCategoryModule({ name, slug: slugify(name) ,category:categoryId });
        await result.save();
        res.status(201).json({ message: "Sub Category added" , result });
    } catch (err) {
        res.status(500).json({ message: "Failed", err });
    }
})



export const getSubCategories = handelingError(async (req, res, next) => {
    let result = await subCategoryModule.find({category:req.params.id})
    res.status(200).json({ message: "done", result })

}
)


export const getAllSubCategories = handelingError(async (req, res, next) => {
    let result = await subCategoryModule.find()
    res.status(200).json({ message: "done", result })

}
)

export const getAllSubCategoryById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await subCategoryModule.findById(id)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result })

})


export const updateSubCategory = handelingError(async (req, res, next) => {
    let { id } = req.params
    let { name , categoryId } = req.body
    let result = await subCategoryModule.findByIdAndUpdate(id, { name, slug: slugify(name)  , category:categoryId}, { new: true })
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "updated", result })

}
)
export const deletecSubCategory = deleteOne(subCategoryModule)