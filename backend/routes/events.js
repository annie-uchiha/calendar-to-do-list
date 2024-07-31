const express = require('express');
const Event = require('../modules/Event'); 

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new event
router.post('/', async (req, res) => {
  const { date, text, done } = req.body;
  const newEvent = new Event({ date, event: { text, done } });
  try {
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, text, done } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { date, event: { text, done } }, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
