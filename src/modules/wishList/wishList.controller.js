import { userModule } from '../../../Database/models/user.model.js';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';





export const updateWishList = handelingError(async (req, res, next) => {

    let { product } = req.body

    let result = await userModule.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { wishList: product } },
        { new: true })
    if (!result) {

        return res.status(404).json({ message: "not found" })

    }
    res.status(200).json({ message: "WishList updated", result })

}

)





export const deleteFromWishList = handelingError(async (req, res, next) => {

    let { product } = req.body

    let result = await userModule.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { wishList: product } },
        { new: true })
    if (!result) {

        return res.status(404).json({ message: "not found" })

    }
    res.status(200).json({ message: "WishList deleted", result })

}

)



export const getAllWishLists = handelingError(async (req, res, next) => {


    let result = await userModule.findById(req.user._id)
    if (!result) {

        return res.status(404).json({ message: "not found" })

    }
    res.status(200).json({ message: "WishList deleted", result })

}

)










