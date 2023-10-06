import { couponModel } from '../../../Database/models/copone.model.js';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';
import QRCode  from 'qrcode';




export const createCoupon = handelingError(async (req, res, next) => {
    try {





        const result = new couponModel(req.body);
        await result.save();
        res.status(201).json({ message: "Coupon added", result });



    } catch (err) {
        res.status(500).json({ message: "Failed", err });
    }
});



export const getAllCoupons = handelingError(async (req, res, next) => {
    let result = await couponModel.find({})
    res.status(200).json({ message: "done", result })

}
)

export const getAllCouponById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await couponModel.findById(id)


    let url = await QRCode.toDataURL(result.code)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result ,url })

})


export const updateCoupon = handelingError(async (req, res, next) => {
    let { id } = req.params

    let result = await couponModel.findOneAndUpdate({ _id: id, }, req.body, { new: true })
    if (!result) {

        return res.status(404).json({ message: "not found" })

    }
    res.status(200).json({ message: "Coupon updated", result })

}

)
export const deleteCoupon = deleteOne(couponModel)