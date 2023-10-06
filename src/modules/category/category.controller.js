
import { categoryModule } from '../../../Database/models/category.model.js'
import slugify from 'slugify';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';





export const createCategory = handelingError(async (req, res, next) => {
    const { name } = req.body;

    try {
        // Check if a category with the same name already exists
        const existingCategory = await categoryModule.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ message: "Category name already exists." });
        }

        // Assuming that the file is uploaded and processed correctly by multer middleware
        const imageFilename = req.file.filename;

        const result = new categoryModule({ name, slug: slugify(name), image: imageFilename });
        await result.save();
        res.status(201).json({ message: "Category added"  , result});
    } catch (err) {
        res.status(500).json({ message: "Failed", error: err.message });
    }
});


export const getAllCategories = handelingError(async (req, res, next) => {
    let result = await categoryModule.find({})
    res.status(200).json({ message: "done", result })

}
)

export const getAllCategoryById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await categoryModule.findById(id)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result })

})


export const updateCategory = handelingError(async (req, res, next) => {
    let { id } = req.params
    let { name } = req.body
    let result = await categoryModule.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "updated", result })

}
)
export const deleteCategory = deleteOne(categoryModule)