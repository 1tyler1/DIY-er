 require('dotenv').config();


 const Users = require('../models/Users');
 const Brains = require('../models/brainstorming');
 const Project = require('../models/projects');
 const mongoose = require('mongoose');

 mongoose.connect(process.env.MONGODB_URI);

 mongoose.connection.on('open', () => {
     console.log(`MONGO IS CONNECTED!!!`);
 });

 mongoose.connection.on('error', error => {
     console.error(`
    Fix your DB man.....
    ${error}
  `);
     process.exit(-1);
 });

 //projects
 const idea2 = new Project({
     description: 'Idea2',
     title: 'New Idea2',
     priority: true,
     timestamp: new Date()
 });

 const idea = new Project({
     description: 'Idea',
     title: 'New Idea',
     priority: true,
     timestamp: new Date()
 })

 //brainstorms

 const random = new Brains({
     title: 'Random',
     description: 'brainstorming',
     timestamp: new Date()
 });

 const random2 = new Brains({
     title: 'Random2',
     description: 'brainstorming2',
     timestamp: new Date()
 });
 //users
 const tyler = new Users({
     username: 'Tyler',
     email: 'Tyler@dope.com',
     project: [idea],
     brainstorm: [random]
 });

 const tryst = new Users({
     username: 'Trystan',
     email: 'Trystan@dope.com',
     project: [idea2],
     brainstorm: [random2]
 });

 Users.remove().then(() => {
     Brains.remove().then(() => {
         Project.remove().then(() => {
             return Users.insertMany([tyler, tryst])

         })
     })

 })