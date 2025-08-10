const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../schemas/UserSchema');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select('-password');
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"  // <-- DİQQƏT: burada 3000 portu
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: profile.displayName || profile.name?.givenName,
                username: profile.id,
                email,
                password: null,
                provider: 'google'
            });
        }

        done(null, user);
    } catch (err) {
        done(err);
    }
}));

// GitHub OAuth (əgər istəsən buranı da 3000 portuna uyğunlaşdır)
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"  // 3000 portu
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: profile.displayName || profile.username,
                username: profile.username,
                email,
                password: null,
                provider: 'github'
            });
        }

        done(null, user);
    } catch (err) {
        done(err);
    }
}));

module.exports = passport;
