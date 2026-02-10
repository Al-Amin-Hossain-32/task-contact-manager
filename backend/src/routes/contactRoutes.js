import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { 
  createContact, 
  getContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";

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

export default router;
