import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Note from '../models/Note.js';
import Task from '../models/Task.js';

const router = express.Router();

// All workspace routes require a valid JWT
router.use(protect);

// --- NOTES ---
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch {
    res.status(500).json({ message: 'Failed to load notes.' });
  }
});

router.post('/notes', async (req, res) => {
  try {
    const { title, subject, content, pages } = req.body;
    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required.' });
    }
    const note = await Note.create({
      user: req.userId,
      title: title.trim(),
      subject: subject.trim(),
      content: content || '',
      pages: pages || 6,
    });
    res.status(201).json(note);
  } catch {
    res.status(500).json({ message: 'Failed to save note.' });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: 'Note deleted.' });
  } catch {
    res.status(500).json({ message: 'Failed to delete note.' });
  }
});

// --- STUDY TASKS ---
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: 1 });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: 'Failed to load tasks.' });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) {
      return res.status(400).json({ message: 'Task text is required.' });
    }
    const task = await Task.create({ user: req.userId, text: text.trim() });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: 'Failed to add task.' });
  }
});

router.patch('/tasks/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch {
    res.status(500).json({ message: 'Failed to update task.' });
  }
});

export default router;