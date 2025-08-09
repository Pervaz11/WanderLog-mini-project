const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = UserSchema; // ✅ Yalnız schema export et
