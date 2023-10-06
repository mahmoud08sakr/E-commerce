import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';
import { reviewModel } from '../../../Database/models/review.model.js';





export const createReview = handelingError(async (req, res, next) => {
    try {
        req.body.user = req.user._id;

        let isReview = await reviewModel.findOne({ user:req.user._id, product: req.body.product });
        console.log(isReview);

      
            const result = new reviewModel(req.body);
            await result.save();
            res.status(201).json({ message: "Review added", result });
            


    } catch (err) {
        res.status(500).json({ message: "Failed", err });
    }
});



export const getAllReviews = handelingError(async (req, res, next) => {
    let result = await reviewModel.find({})
    res.status(200).json({ message: "done", result })

}
)

export const getAllReviewById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await reviewModel.findById(id)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result })

})


export const updateReview = handelingError(async (req, res, next) => {
    let { id } = req.params

    let result = await reviewModel.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true })
    if (!result) {

        return res.status(404).json({ message: "not found" })

    }
    res.status(200).json({ message: "review updated", result })

}

)
export const deleteReview = deleteOne(reviewModel)