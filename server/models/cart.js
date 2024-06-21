const mongoose = require("mongoose");
const cart = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model("Cart", cart);
