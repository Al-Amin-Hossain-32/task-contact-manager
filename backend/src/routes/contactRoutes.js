import express from "express";
import { parser } from "../utils/cloudinary.js";
import { 
  createContact, 
  getContacts, 
  getContact, 
  updateContact, 
  deleteContact 
} from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", parser.single("photo"), createContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.put("/:id", parser.single("photo"), updateContact);
router.delete("/:id", deleteContact);

export default router;
