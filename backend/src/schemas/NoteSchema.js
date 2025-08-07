const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
