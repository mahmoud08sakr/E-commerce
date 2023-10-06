
import { cartModel } from '../../../Database/models/cartModel.js';
import { orderModel } from '../../../Database/models/order.model.js';
import { prouductModule } from '../../../Database/models/prouduct.model.js';
import handelingError from '../../utils/middleware/catchAsyncError.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NyGweE6oO7tnMYFFhzHruvNKxaJki588TxHamvNKtwLpBplC664MmCNBxdTSNqZL8BPX5jOrFIgrqiiIoevafK900zxalhjra');



export const createCashOrder = handelingError(async (req, res, next) => {
    try {
        let cart = await cartModel.findById(req.params.id);

        if (!cart) {
            console.log("Cart not found");
            return res.json({ message: 'Cart not found' });
        }

        let totalOrderPrice = cart.totalOrderPriceAfterDiscount || cart.totalPrice;

        let order = new orderModel({
            user: req.user._id,
            cartItem: cart.cartItem,
            totalOrderPrice,
            shippingAddress: req.body.shippingAddress,
        });

        if (order) {
            console.log("Order created");
            let options = cart.cartItem.map(item => ({
                updateOne: {
                    filter: { _id: item.product }, // Assuming "product" is the correct field name
                    update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
                }
            }));

            console.log("Bulk write options:", options);

            await prouductModule.bulkWrite(options);

            console.log("Bulk write completed");

            await order.save();

            console.log("Order saved");
        } else {
            res.json({ message: "something wrong in order" });
        }

        await cartModel.findByIdAndDelete(req.params.id);

        console.log("Cart deleted");

        return res.json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Failed to create order", error });
    }
});







export const getOrder = handelingError(async (req, res, next) => {


    let order = await orderModel.findOne({ user: req.user._id }).populate("cartItem.prouduct");

    res.json({ message: "done", order })



})


export const getAllOrder = handelingError(async (req, res, next) => {


    let order = await orderModel.find({ user: req.user._id }).populate("cartItem.prouduct");

    res.json({ message: "done", order })



})

export const onlinePayment = async (req, res, next) => {
    try {
        // Find the cart by ID
        const cart = await cartModel.findById(req.params.id);

        if (!cart) {
            return res.json({ message: 'Cart not found' });
        }

        // Calculate the total order price, considering discounts if available
        const totalOrderPrice = cart.totalOrderPriceAfterDiscount || cart.totalPrice;

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'egp', // Replace with your desired currency
                        unit_amount: totalOrderPrice * 100,
                        product_data: {
                            name: req.user.name
                        }
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://www.google.com/', // Replace with your success URL
            cancel_url: 'https://www.facebook.com/', // Replace with your cancel URL
            customer_email: req.user.email, // Use the customer's email
            client_reference_id: req.params.id, // Use the cart ID as a reference
            metadata: req.body.shippingAddress, // Include metadata as needed
        });

        // Respond with a message (you can also redirect to Stripe)
        res.json({ message: 'Checkout session created successfully', sessionId: session.id  , session});
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ message: 'Failed to create checkout session', error: error.message });
    }
};