const multer = require("multer");
const path = require("path");

// Yüklənəcək qovluq
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profile-images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Yalnız şəkil fayllarına icazə
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Yalnız şəkil faylları yüklənə bilər"), false);
    }
    
};

module.exports = multer({ storage, fileFilter });
