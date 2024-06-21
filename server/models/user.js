const mongoose = require("mongoose");
const user = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  username: String,
  email:String,
  password: { type: String, select: true },
  role: String, // student or admin
});

module.exports = mongoose.model("User", user);
