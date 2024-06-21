// orderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');

// Middleware to check if the user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).send("Unauthorized: Please log in first");
    }
}

router.use(ensureAuthenticated);


router.post("/order", async (req, res) => {
    const { paymentDetails, cartId } = req.body;
    try {
        const cart = await Cart.findById(cartId).populate('cart');

        if (!cart || cart.username !== req.user.username) {
            return res.status(404).send("Cart not found or unauthorized");
        }

        let groupedBySeller = {};
        cart.cart.forEach(product => {
            if (!groupedBySeller[product.seller]) {
                groupedBySeller[product.seller] = [];
            }
            groupedBySeller[product.seller].push(product);
        });

        let orderResponses = [];
        for (let seller in groupedBySeller) {
            let products = groupedBySeller[seller];
            let total = 0;
            products.forEach(product => {
                total += product.price;
            });

            const order = new Order({
                products: products,
                user: req.user._id,
                total: total,
                paymentDetails: paymentDetails
            });

            await order.save();
            orderResponses.push(order);
        }

        cart.cart = [];
        await cart.save();

        res.status(200).send(orderResponses);

    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});



router.get("/seller-orders", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Please log in first");
        }

        const orders = await Order.find().populate({
            path: 'products',
            match: { seller: req.user._id }
        }).exec();

        const filteredOrders = orders.filter(order => order.products.length > 0);

        res.status(200).send(filteredOrders);
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});



// Approve an order 
router.put("/order/approve/:orderId", async (req, res) => {

    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status: 'APPROVED' }, { new: true });
        if (!order) {
            return res.status(404).send("Order not found");
        }
        res.status(200).send(order);

    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

// Complete an order (Admin only)
router.put("/order/complete/:orderId", async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Only admins can complete orders");
    }

    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status: 'COMPLETED' }, { new: true });
        if (!order) {
            return res.status(404).send("Order not found");
        }
        res.status(200).send(order);

    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

// Get all orders for an admin
router.get("/orders", async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send("Only admins can view all orders");
    }

    try {
        const orders = await Order.find().populate('products').populate('user');
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

// Get previous orders for a student
router.get("/my-orders", async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products');
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send("Error occurred: " + err.message);
    }
});

module.exports = router;