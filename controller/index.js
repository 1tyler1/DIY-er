const express = require('express');
const router = express.Router();
const Users = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {

    Users.find().then((Users) => {
            console.log(Users[0])
            res.render("users/index", {
                Users: Users,
                title: "DIY-er"
            })
        })
        .catch((error) => {
            console.log(error)
        })
});
router.get('/edit', function(req, res) {
    res.render("users/edit")
});

router.get('/new', function(req, res) {
    res.render('users/new');
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id
    Users.findById(id).then(user => {

            res.render('users/show', {
                user: user,
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/:id/projects', function(req, res) {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            res.render('projects/show', {
                user: user,
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:id/projects/new', function(req, res) {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            res.render('projects/new', {
                user: user,
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:id/brainstorming', function(req, res) {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            res.render('brainstorming/show', { user: user });
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/:id/brainstorming/new', function(req, res) {
    const id = req.params.id;
    const body = req.body;
    Users.id(id, body)
        .then(user => {
            res.redirect(`/brainstorming`);
        })
        .catch(err => {
            console.log(err);
        });
});

//router.post('/', function(req, res) {

//router.delete('/:id', function(req, res) {

module.exports = router