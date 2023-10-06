import { brandModule } from "../../../../Database/models/brand.model.js"
import handelingError from "../catchAsyncError.js"


const deleteOne = (model) => {
return  handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await model.findByIdAndDelete(id)

    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "deleted", result })

})


}


export default deleteOne