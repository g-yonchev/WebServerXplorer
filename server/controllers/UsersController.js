var users = require('../services/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getLogin: function (req, res, next) {
        res.render(`${CONTROLLER_NAME}/login`);
    },
    getRegister: function (req, res, next) {
        res.render(`${CONTROLLER_NAME}/register`);
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match';
            return res.redirect('/register');
        }

        users.create(newUserData)
            .then(function (user) {
                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({
                            reason: err.toString()
                        });
                    } else {
                        res.redirect('/');
                    }
                });
            }, function (err) {
                req.session.error = 'Failed to register new user.' +
                    ' Perhaps already registered.' +
                    '<br />error: ' + err.errmsg;
                return res.redirect('/');
            });
    },
};
