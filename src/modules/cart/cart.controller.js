import { cartModel } from '../../../Database/models/cartModel.js';
import { prouductModule } from '../../../Database/models/prouduct.model.js';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import deleteOne from '../../utils/middleware/handdler/refactorHandler.js';
















function calcPrice ( cart){
    let totalPrice =0
    cart.cartItem.forEach(ele => {
        totalPrice +=ele.quantity * ele.price
        
    });


    cart.totalPrice = totalPrice
}




export const createCart = handelingError(async (req, res, next) => {
    try {
        const product = await prouductModule.findById(req.body.products).select("price");

        if (!product) {
            return res.json({ message: 'Product not found' });
        }
console.log(req.body.products);
        const newItem = {
            prouduct: req.body.products,
            price: product.price,
            quantity: 1
        };

        const userCart = await cartModel.findOne({ user: req.user._id });

        if (!userCart) {
            const cart = new cartModel({
                user: req.user._id,
                cartItem: [newItem]
            });

            await cart.save();

            return res.json({ message: "Cart added successfully", cart });
        }

        const existingItem = userCart.cartItem.find(item => item.product == req.body.products);

        if (existingItem) {
            // Debugging: Log the existingItem to check its values
            console.log("Existing Item:", existingItem);

            existingItem.quantity += 1;
        } else {
            // Debugging: Log the newItem to check its values
            console.log("New Item:", newItem);

            userCart.cartItem.push(newItem);
        }

        await userCart.save();

        return res.json({ message: "Item added to cart successfully", userCart });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add item to cart", error });
    }
});




export const updateCart = handelingError(async (req, res, next) => {

    let prouduct = await prouductModule.findById(req.body.products).select("price")
    if (!prouduct) {
        res.json({ message: 'Product not found' })
    }

    req.body.price = prouduct.price
    let isCartExist = await cartModel.findOne({ user: req.user._id })

    if (!isCartExist) {



        let cart = new cartModel({
            user: req.user._id
            ,
            cartItem: [req.body]
        })

        await cart.save()

        return res.json({ message: "cart added successfully", cart })
    }

    let item = isCartExist.cartItem.find((ele) => ele.prouduct == req.body.prouduct)


    !item && res.json({ message: "item Not found", })
    if (item) {
        item.quantity += req.body.quantity
    }


    await isCartExist.save()
    res.json({ message: "medo", isCartExist })
});


export const getAllCart = handelingError(async (req, res, next) => {

    let cart = await cartModel.find({ user: req.user._id })
    res.json({ message: "done", cart })

})



export const applyCoupone = handelingError(async (req, res, next) => {


    let code = await couponModel.findOne({ code: req.params.code })
    let cart = await cartModel.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100
    cart.discount = code.discount
    await cartModel.save()
    res.json({ message: "coupone applied succesfuly ", cart })

})


export const deleteItem = handelingError(async (req, res, next) => {

    let cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItem: { _id: req.params.id } } })
    res.json({ message: "item deleted", cart })


})


export const deleteReview = deleteOne(cartModel)