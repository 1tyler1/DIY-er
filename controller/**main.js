const express = require('express');
const router = express.Router();
const brainstorming = require('../models/brainstorming');
const projects = require('../models/projects');


/* GET home page. */
router.get('/custom', function(req, res, next) {
    brainstorming.find().then((brainstorming) => {
        console.log(brainstorming[0]);
        res.render('main/index.hbs', { brainstorming: brainstorming });
    })
});


module.exports = router;