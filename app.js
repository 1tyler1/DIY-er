require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./controller/index');
// var new_accountRouter = require('./controller/new_account');
var brainstormingRouter = require('./controller/brainstorming');
var brainstorming_editRouter = require('./controller/brainstorming_edit');
// var notesRouter = require('./controller/notes');
//var mainRouter = require('./controller/main');
var projectsRouter = require('./controller/projects');
var projects_editRouter = require('./controller/projects');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.use('/new_account', new_accountRouter);
//app.use('/main', mainRouter);
app.use('/:userId/brainstorming/new', brainstormingRouter);
app.use('/:userId/brainstorming/edit', brainstorming_editRouter);
// app.use('/notes', notesRouter);
app.use('/:userId/projects/new', projectsRouter);
app.use('/:userId/projects/edit', projects_editRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;