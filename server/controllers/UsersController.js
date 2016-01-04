var encryption = require('../services/encryption');
var users = require('../services/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getLogin: function (req, res, next) {
        res.render(`${CONTROLLER_NAME}/login`);
    },
    getRegister: function (req, res, next) {
        res.render(`${CONTROLLER_NAME}/register`);
    },
    postRegister: function(req, res, next) {
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match';
            return res.redirect('/register');
        }

        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        users.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400);
                return res.send({reason: err.toString()});
            }

            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                } else {
                    res.redirect('/');
                }
            });
        });
    },
};