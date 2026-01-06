const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please add a task title' });
    }

    try {
        const task = await Task.create({
            title,
            description,
            status,
            user: req.user._id,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.remove();

        res.json({ message: 'Task removed' });
    } catch (error) {
        // mongoose remove might be deprecated in newer versions, use deleteOne
        try {
            await Task.deleteOne({ _id: req.params.id });
            res.json({ message: 'Task removed' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
};
