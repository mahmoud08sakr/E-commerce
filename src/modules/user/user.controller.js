import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import slugify from 'slugify';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';
import { userModule } from '../../../Database/models/user.model.js';















export const changePassword = handelingError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        req.body.changePasswordAt = Date.now

        // Check if a valid newPassword is provided
        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Adjust saltRounds as needed

        // Update the password in the database
        const result = await userModule.findByIdAndUpdate(
            { _id: id },
            { password: hashedPassword },
            { new: true }
        );

        if (result) {
            res.json({ message: "Password changed", result });
        } else {
            res.json({ message: "Password is incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to change password", error: error.message });
    }
});


export const getAllUsers = handelingError(async (req, res, next) => {
    let result = await userModule.find({})
    res.status(200).json({ message: "done", result })

}
)

export const getAllUserById = handelingError(async (req, res, next) => {
    let { id } = req.params
    let result = await userModule.findById(id)
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "done", result })

})




export const updateUser = handelingError(async (req, res, next) => {
    let { id } = req.params
    let { name, email, phone } = req.body

    let result = await userModule.findByIdAndUpdate(id, { name, email, phone }, { new: true })
    if (!result) {
        return res.status(404).json({ message: "not found" })
    }
    res.status(200).json({ message: "updated", result })

}
)
export const deleteUser = deleteOne(userModule)