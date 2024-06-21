const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    slots: {
        type: Number,
        default: 0
    },
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'CLOSED'],
        default: 'PENDING'
    },
    offeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Tutorial", TutorialSchema);
