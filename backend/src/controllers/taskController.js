import Task from "../models/Task.js";

// GET all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE task
export const createTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;

  if (!title || !description || !deadline) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      deadline,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted", _id: task._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE task
export const updateTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title, description, status, priority, deadline },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
