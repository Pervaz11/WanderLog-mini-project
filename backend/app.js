const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes import
const TravelListRoutes = require('./src/routes/TravelList.route');
const UserRoutes = require('./src/routes/User.route');

// API Routes
app.use("/api/travel-lists", TravelListRoutes);
app.use("/auth", UserRoutes);

// Health check
app.get('/', (_req, res) => {
    res.send('Hello from Express ❤️');
});

module.exports = app;
