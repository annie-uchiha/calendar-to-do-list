
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let events = {}; // This would ideally be replaced with a database

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const { date, event } = req.body;
  if (!events[date]) {
    events[date] = [];
  }
  events[date].push(event);
  res.status(201).send();
});

app.put('/api/events', (req, res) => {
  const { date, event } = req.body;
  // Logic to update the event
  res.status(200).send();
});

app.delete('/api/events', (req, res) => {
  const { date, eventId } = req.body;
  // Logic to delete the event
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
