var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
var passport = require('passport');

module.exports = function (app, config) {
    app.locals.baseUrl = `http://localhost:${config.port}`;

    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'magic unicorns',
        resave: true,
        saveUninitialized: true
    }));
    app.use(busboy({
        immediate: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));

    // custom middleware
    app.use(function (req, res, next) {
        // app.locals is valid for entire session so we need to delete 
        // it for the next request
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        } else {
            app.locals.errorMessage = undefined;
        }

        next();
    });
    app.use(function (req, res, next) {
        // res.locals is only valid for current request
        // no need to delete it if log out
        if (req.user) {
            res.locals.currentUser = req.user;
        }

        next();
    });
};
