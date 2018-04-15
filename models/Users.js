const mongoose = require('mongoose');
const schema = require('../db/schema');

const users = mongoose.model('users', schema.usersSchema);

module.exports = users