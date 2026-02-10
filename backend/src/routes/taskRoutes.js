const express = require("express");

const router = express.Router();
const {protect} = require("../middlewares/authMiddleware")
const {createTask,getTasks,updateTask,deleteTask} = require("../controllers/taskController")
// import { authMiddleware } from "../middleware/authMiddleware.js";
// router.use(authMiddleware);

router.post("/",protect,createTask)
router.get("/",protect,getTasks);
router.put("/:id",protect,updateTask);
router.delete("/:id",protect,deleteTask)

module.exports = router;

