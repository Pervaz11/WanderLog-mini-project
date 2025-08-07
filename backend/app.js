// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ⬇️ Travel List route əlavə edilir
const TravelListRoutes = require('./src/routes/TravelList.route');
app.use("/api/travel-lists", TravelListRoutes);

app.get('/', (_req, res) => {
    res.send('Hello from Express ❤️');
});

module.exports = app;
