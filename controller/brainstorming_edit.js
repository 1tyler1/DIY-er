var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    const id = req.params.id;

    Users.findById(id)
        .then(user => {
            res.render('brainstorming/edit', { user: user });
        })
        .catch(err => {
            console.log(err);
        });
});




router.delete('/:id', function(req, res) {
    res.redirect("brainstorming/show")
})


module.exports = router;