const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImage: { type: String, default: '' },
    provider: { type: String, default: 'local' },
    emailVerified: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    isBanned: { type: Boolean, default: false },
    banUntil: { type: Date, default: null },
    lastLogin: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
