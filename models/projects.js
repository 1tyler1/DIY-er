const mongoose = require('mongoose');
const schema = require('../db/schema');

const project = mongoose.model('projects', schema.projectsSchema);

module.exports = project