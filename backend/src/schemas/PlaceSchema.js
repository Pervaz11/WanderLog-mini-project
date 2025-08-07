const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
    name: { type: String, required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    description: String,
    image: String,
    location: {
        lat: Number,
        lng: Number
    },
    visitDate: Date
});

module.exports = mongoose.model('Place', placeSchema);
