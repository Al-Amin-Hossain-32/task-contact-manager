const express = require("express");
const { createContact, getContacts, getContact, updateContact, deleteContact } = require("../controllers/contactController");
const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer + Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "contacts",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const parser = multer({ storage });

const router = express.Router();

// Protect all routes
router.use(protect);

// CRUD routes
router.post("/", parser.single("photo"), createContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.put("/:id", parser.single("photo"), updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
