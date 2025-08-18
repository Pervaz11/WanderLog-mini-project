const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const upload = require("../middlewares/upload");


// Local Auth
router.post('/register', userController.register);
router.post('/login', userController.login);

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Burada DB yoxlaması və ya user yaradılması
    let user = { id: profile.id, email: profile.emails[0].value };
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/login' }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          fullName: req.user.fullName,
          profileImage: req.user.profileImage
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userData = {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        profileImage: req.user.profileImage
      };

      // Frontend üçün cookie və ya query param olaraq göndərə bilərsən
      res.redirect(`http://localhost:5173/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
    } catch (err) {
      console.error(err);
      res.redirect('/auth/login');
    }
  }
);

router.put('/:id/profile-image', upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "Şəkil faylı tapılmadı" });
    }

    const imagePath = `/uploads/profile-images/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imagePath },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

    res.json({ message: "Profil şəkli yeniləndi", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server xətası", error: err.message });
  }
});


// CRUD Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);




module.exports = router;
