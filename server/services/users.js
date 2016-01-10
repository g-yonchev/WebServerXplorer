var User = require('mongoose').model('user');

module.exports = {
    create: function (user, callback) {
        User.create(user, callback);
    },
    getAll: function () {
        return User.find({});
    },
    getById: function (id) {
        return User.findOne({_id: id})
    }
};