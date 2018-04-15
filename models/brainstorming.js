const mongoose = require('mongoose');
const schema = require('../db/schema');

const brains = mongoose.model('brainstorming', schema.brainstormingSchema);

module.exports = brains