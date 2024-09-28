const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    ignition: String
});

const LocationStore = mongoose.model("Location", locationSchema);

// Export the model
module.exports = LocationStore;
