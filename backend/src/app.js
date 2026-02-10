import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "*", // পরে frontend domain দিবা
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/contacts", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API Running...");
});

export default app;
