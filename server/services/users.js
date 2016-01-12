var User = require('mongoose').model('user');
var encryption = require('../services/encryption');

module.exports = {
    create: function (user) {
        user.salt = encryption.generateSalt();
        user.hashPass = encryption.generateHashedPassword(user.salt, user.password);

        return new Promise(function (resolve, reject) {
            User.create(user, function (err, user) {
                if (err) {
                    reject(err);
                }

                resolve(user);
            });
        });
    }
};
