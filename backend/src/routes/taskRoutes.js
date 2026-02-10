import express from "express";
const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
