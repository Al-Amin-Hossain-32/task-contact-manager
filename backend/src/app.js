import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(cors({
  origin: "https://task-contact-manager.onrender.com",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => res.send("Task Manager API Running..."));

export default app;
