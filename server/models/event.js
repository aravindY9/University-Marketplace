const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    eventName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Event", EventSchema);
