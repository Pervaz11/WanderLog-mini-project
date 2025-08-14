    const express = require('express');
    const cors = require('cors');
    const dotenv = require('dotenv');
    const mongoose = require('mongoose');
    const session = require('express-session');
    const passport = require('passport');

    dotenv.config();

    require('./src/config/passport');

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Routers
    const TravelListRoutes = require('./src/routes/TravelList.route');
    const UserRoutes = require('./src/routes/User.route');

    app.use('/api/travel-lists', TravelListRoutes);
    app.use('/auth', UserRoutes);

    app.get('/', (_req, res) => {
        res.send('Hello from Express ❤️');
    });

    module.exports = app;
