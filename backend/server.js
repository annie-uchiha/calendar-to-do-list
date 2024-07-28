const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/calendarDB', { useNewUrlParser: true, useUnifiedTopology: true });

const eventSchema = new mongoose.Schema({
  date: String,
  events: [
    {
      text: String,
      done: Boolean,
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/events', async (req, res) => {
  const { date, event } = req.body;
  try {
    let existingEvent = await Event.findOne({ date });
    if (existingEvent) {
      existingEvent.events.push(event);
      await existingEvent.save();
    } else {
      const newEvent = new Event({ date, events: [event] });
      await newEvent.save();
    }
    res.status(201).send('Event added');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/events/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const event = await Event.findOne({ date });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).send('No events found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/events/:date/:index', async (req, res) => {
  const { date, index } = req.params;
  const { done } = req.body;
  try {
    const event = await Event.findOne({ date });
    if (event) {
      event.events[index].done = done;
      await event.save();
      res.status(200).send('Event updated');
    } else {
      res.status(404).send('No events found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
