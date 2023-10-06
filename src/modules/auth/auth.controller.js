import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { userModule } from '../../../Database/models/user.model.js';

import handelingError from "../../utils/middleware/catchAsyncError.js";






export const signUp = handelingError(async (req, res, next) => {
    try {
        let user = await userModule.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Hash the password before saving it to the database
        // const hashedPassword = await bcrypt.hash(req.body.password, 10); // You can adjust the saltRounds as needed

        const newUser = new userModule({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // Store the hashed password in the database
            phone: req.body.phone

        });

        await newUser.save();
        res.status(201).json({ message: "User added", newUser });
    } catch (err) {
        res.status(500).json({ message: "Failed", error: err });
    }
});








export const signIn = handelingError(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModule.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            'saba7oKora',

        );

        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
})


export const allowTo = (...roles) => {





    return handelingError((req, res, next) => {



        if(!roles.includes(req.user.role)){
            res.json({ message: 'not authorized'  })
        }else{
            next()
        }
        console.log(roles);
        console.log(req.user);

        // next()
    })

}

export const protectedRoutes = handelingError(async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ message: 'Please provide a token' });
    }
    let decode = jwt.verify(token, "saba7oKora")
    // console.log(decode.iat);

    // console.log(decode);
    if (decode) {

        let user = await userModule.findById(decode.userId);
        if (!user) {

            res.json({ message: 'user not found' });

        }
        // console.log(user);

        req.user = user
        next()
    }


});








