const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: Date,
    endDate: Date,
    location: String,
    coverImage: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
