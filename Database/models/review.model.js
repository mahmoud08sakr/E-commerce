import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    comment: {
        type: String,      // Use 'type' instead of 'tybe'
        trim: true,        // Use 'true' instead of 'String'
        required: [true, 'Review comment required'],  // Use 'required' instead of 'reqired'
    },
    products: [
        {
            type: mongoose.Types.ObjectId,  // Specify the type as ObjectId
            ref: 'Product'  // Reference the 'Product' model
        }
    ],
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }],
    rating: {
        type: Number,
        min:1,
        max:5
    }
},
    { timestamps: true }
)
reviewSchema.pre(/^find/ , function (){
    this.populate('user' , "name")
})

export const reviewModel = mongoose.model('review', reviewSchema);