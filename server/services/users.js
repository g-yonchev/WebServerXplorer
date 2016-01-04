var User = require('mongoose').model('user');

module.exports = {
    create: function (user, callback) {
        User.create(user, callback);
    }
};