const mongoose = require("mongoose");

const PaymentDetailsSchema = new mongoose.Schema({
    cardNumber: String,  
    expirationDate: String,
    cvv: String
});

const OrderSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    total: Number,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "COMPLETED"],
        default: "PENDING"
    },
    paymentDetails: PaymentDetailsSchema
});

module.exports = mongoose.model("Order", OrderSchema);
