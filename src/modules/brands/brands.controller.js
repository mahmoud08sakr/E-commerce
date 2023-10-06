
import slugify from 'slugify';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import { brandModule } from '../../../Database/models/brand.model.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';





export const createBrand = handelingError(async (req, res, next) => {
    const { name } = req.body;
    try {
        const existingBrand = await brandModule.findOne({ name });

        if (existingBrand) {
            return res.status(400).json({ message: "Brand name already exists." });
        }
        let logo = req.file.filename
        const result = new brandModule({ name, slug: slugify(name), logo });
        await result.save();
        res.status(201).json({ message: "Brand added", result });
    } catch (err) {
        res.status(500).json({ message: "Failed", err });
    }
})



export const getAllBrands = handelingError(async (req, res, next) => {
    let result = await brandModule.find({})
    res.status(200).json({ message: "done", result })

}
)

export const getAllBrandById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await brandModule.findById(id)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result })

})


export const updateBrand = handelingError(async (req, res, next) => {
    let { id } = req.params
    let { name } = req.body
    if(req.file){
        logo = req.file.filename
    }
    let result = await brandModule.findByIdAndUpdate(id, { name, slug: slugify(name) , logo }, { new: true })
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "updated", result })

}
)
export const deleteBrand = deleteOne(brandModule)