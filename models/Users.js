const mongoose = require('mongoose');
const schema = require('../db/schema');

const Users = mongoose.model('Users', schema.usersSchema);

module.exports = Users