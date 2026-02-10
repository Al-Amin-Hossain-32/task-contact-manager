const express = require("express");
const cors = require("cors");

const app = express(); 

app.use(cors({
  origin: "*", // পরে frontend domain দিবা
  credentials: true
}));
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const testRoutes = require("./routes/testRoutes")
app.use("/api/test",testRoutes)

const taskRoutes = require("./routes/taskRoutes")
app.use("/api/tasks",taskRoutes)

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts",contactRoutes)

app.get("/", (req, res) => {
  res.send("Task Manager API Running...")
});

module.exports = app;