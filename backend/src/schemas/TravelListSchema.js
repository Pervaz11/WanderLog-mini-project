const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TravelListSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    isPublic: { type: Boolean, default: true },
    tags: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    coverImage: { type: String },
    destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
    chat: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    createdAt: { type: Date, default: Date.now },
});

const TravelList = mongoose.model("TravelList", TravelListSchema);

module.exports = TravelList;
