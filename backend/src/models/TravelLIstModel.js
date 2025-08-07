const mongoose = require('mongoose');
const travelListSchema = require('../schemas/TravelListSchema');

const TravelList = mongoose.model('TravelList', travelListSchema); // DÜZGÜN
module.exports = TravelList;
