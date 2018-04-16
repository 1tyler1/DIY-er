const express = require('express');
const router = express.Router();
const Users = require('../models/Users')
const projects = require('../models/projects')


/* GET home page. */
router.get('/', function(req, res, next) {

    Users.find({}).then((Users) => {
            console.log("CURRENT USERS:", Users)
            console.log("User Zero", Users[0])
            res.render("users/index", {
                Users: Users,
                title: "DIY-er"
            })
        })
        .catch((error) => {
            console.log(error)
        })
});

router.get('/:id', function(req, res, next) {

    const id = req.params.id;
    Users.findById(id)
        .then(Users => {
            res.render('users/show', {
                Users: Users,
            });
        })
        .catch(err => {
            console.log(err);
        });
});
//Iceboxed work-IT DOES ACTUALLY WORk, I just don't have time to build about full CRUD
// router.get('/edit', function(req, res) {
//     res.render("users/edit")
// });

// router.get('/new', function(req, res) {
//     res.render('users/new');
// });



//projects **THIS IS WHERE MY FULL CRUD IS**

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

//projects edit form

router.get('/:id/projects/edit', function(req, res) {
            const id = req.params.id;

            projects.findByIdAndUpdate(id)
                .then(user => {
                    res.render('projects/edit');
                });

            //projects new form

            router.get('/:id/projects/new', function(req, res) {
                res.render('projects/new')
            });

            router.put('/:id/projects', function(request, response) {

                var userId = request.params.id;


                var newUserInfo = request.body;


                User.findByIdAndUpdate(userId, newUserInfo, { new: true }).exec(function(
                    error,
                    user
                ) {
                    if (error) {
                        console.log('Error while updating User with ID of ' + userId);
                        return;
                    }


                    response.redirect('/users/' + userId);
                });
            });

            router.delete('/:id/projects/', (req, res) => {

                projects.findByIdAndRemove(req.params.id).then(() => {
                    res.redirect('/:id/projects')
                })
            });



            //brainstorms - 

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