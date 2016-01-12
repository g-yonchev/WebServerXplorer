var User = require('mongoose').model('user');
var encryption = require('../services/encryption');
var mail = require('./mail');

module.exports = {
    create: function (user, callback) {
        User.create(user, callback);
    },
    getAll: function () {
        return User.find({});
    },
    getById: function (id) {
        return User.findOne({_id: id})
    },
    setResetPasswordToken: function (email, link) {
        return new Promise(function (resolve, reject) {
            User.findOne({email: email})
                .then(function (user) {
                    if (!user) {
                        reject({success: false})
                    }

                    user.token = encryption.generateRandomText(20);
                    user.save();
                    link = link + user.token;
                    mail.changePassword(email, link)
                        .then(function () {
                            resolve({success: true})
                        })
                        .catch(function (err) {
                            reject(err)
                        })
                })
        });
    },
    getUserByToken: function (token) {
        return new Promise(function (resolve, reject) {
            User.findOne({token: token})
                .then(function (user) {
                    if (!user) {
                        reject('User does\'t exist!')
                    }

                    resolve(user);
                })
        })
    },
    changePassword: function (userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.getById(userData.id)
                .then(function (user) {
                    if (!user) {
                        reject('User does\'t exist!')
                    }

                    user.hashPass = encryption.generateHashedPassword(user.salt, userData.password);
                    user.token= undefined;
                    user.save();

                    resolve(user);
                })
        })
    }
};