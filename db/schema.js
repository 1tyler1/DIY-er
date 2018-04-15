const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brainstormingSchema = new Schema({
    title: String,
    description: String,
    timestamp: Date,
});
const projectsSchema = new Schema({
    title: String,
    description: String,
    priority: Boolean,
    timestamp: Date,
});
const usersSchema = new Schema({
    username: String,
    email: String,
    project: [projectsSchema],
    brainstorm: [brainstormingSchema]
});

module.exports = {
    brainstormingSchema,
    projectsSchema,
    usersSchema
}