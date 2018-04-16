const express = require('express');
const router = express.Router();
const Users = require('../models/Users')


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

//projects

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


router.get('/:id/projects/edit', function(req, res) {
    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            res.render('projects/edit', {
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

//brainstorms

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

router.get('/:id/brainstorming/delete', function(req, res) {
    const id = req.params.id;

    Users.findById(id)
        .then((user) => {
            user.projects.id(projectId).remove();

            return user.save();
        }).then(() => res.render(
                'brainstorming/index')
            .catch(err => {
                console.log(err);
            }))
});

router.get('/:id/brainstorming/new', function(req, res) {
    const id = req.params.id;
    const body = req.body;
    Users.create(body)
        .then(user => {
            res.redirect('brainstorming/');
        })
        .catch(err => {
            console.log(err);
        });
});

router.patch('/:id/brainstorming/edit', ((req, res) => {
    const brains = Brainstorming.findByIdAndUpdate(req.params.id, {
        title: title,
        description: description,
        timestamp: timestamp
    }, ).then((brains) => {
        res.redirect('brainstorming/')

    })
}))

module.exports = router