const Task = require('../models/taskModel');

// Lấy tất cả task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Thêm task mới
const addTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTask = new Task({ title, description, dueDate, priority });
    const savedTask = await newTask.save();
    res.status(201).json({
      message: 'task added sucessfully',
      data: savedTask,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Cập nhật task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask)
      return res.status(404).json({ message: 'Task not found' });

    res.json({
      message: 'task updated sucessfully',
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Xóa task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask)
      return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
