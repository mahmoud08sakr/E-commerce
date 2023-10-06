// find search sort m4 4a8aleen 
// class feh mo4kela 



import slugify from 'slugify';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';
import { prouductModule } from '../../../Database/models/prouduct.model.js';







export const createProduct = handelingError(async (req, res, next) => {
    const { title } = req.body;
    req.body.slug = slugify(title);

    try {
        const existingProduct = await prouductModule.findOne({ title });

        if (existingProduct) {
            return res.status(400).json({ message: "Product name already exists." });
        }

        const result = new prouductModule(req.body);
        await result.save();
        res.status(201).json({ message: "Product added" });
    } catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});


export const getAllProuduct = handelingError(async (req, res, next) => {

    //TODO: PAGINATION

    let page = req.query.page * 1 || 1;
    if (req.query.page <= 0) {
        page = 1;
    }
    let skip = (page - 1) * 4

    //TODO: PAGINATION




    //TODO: filtering
    let filterOpj = { ...req.query }
    let exclidedQuery = ["sort", "page", "keywords", "felids"]
    exclidedQuery.forEach((q) => {
        delete filterOpj[q];

    })
    //TODO: filtering

    console.log(filterOpj);




    // TODO: buiding objec

    let mongooQuery = prouductModule.find(filterOpj).skip(skip).limit(8)




    // TODO: excute object


    let result = await mongooQuery
    res.status(200).json({ message: "done", page, result })
    //TODO: sort
    if (req.query.sort) {
        let sortBy = req.query.sort.split(',')
        mongooQuery.sort(sortBy)
        console.log(mongooQuery + req.query.sort);
    }





    //TODO: search

    if (req.query.keyword) {
        mongooQuery.find({ title: req.query.keyword })

    }








}
)




export const getAllProuductById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await prouductModule.findById(id)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result })

})


export const updateProuduct = handelingError(async (req, res, next) => {
    let { id } = req.params
    let { title } = req.body

    if (req.body.title) {
        req.body.slug = slugify(title)
    }
    let result = await prouductModule.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "updated", result })

}
)
export const deleteProuduct = deleteOne(prouductModule)