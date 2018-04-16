var express = require('express');
var router = express.Router();
const Users = require('../models/Users');


/* GET home page. */
router.get('/', function(req, res) {
    const id = req.params.userId;
    Users.findById(id)
        .then(user => {
            res.render('projects/index', {
                user: user
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/edit', function(req, res) {
    res.render('projects/edit');
});

router.get('/new', function(req, res) {
    res.render('projects/edit');
});

router.delete('/:id', function(req, res) {
    res.redirect("users/")
})


module.exports = router;