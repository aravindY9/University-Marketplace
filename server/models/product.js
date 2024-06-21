const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    stock: Number,
    price: Number,
    picture: String,
    details: String,
    status: {
        type: String,
        enum: ["PENDING", "APPROVED"],
        default: "PENDING"
    },
});

module.exports = mongoose.model("Product", Product);
