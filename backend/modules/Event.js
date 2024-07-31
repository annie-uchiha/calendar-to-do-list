const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  event: {
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
