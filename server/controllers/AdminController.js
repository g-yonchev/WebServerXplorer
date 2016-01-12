var users = require('../services/users');

var CONTROLLER_NAME = 'admin';

module.exports = {
    getAllUsers: function (req, res) {
        users.getAll()
            .then(function (reqUsers) {
                res.render(`${CONTROLLER_NAME}/all-users`, {users: reqUsers});
            })
    },
    getEditUser: function (req, res) {
        var id = req.params.id;
        users.getById(id)
            .then(function (user) {
                res.render(`${CONTROLLER_NAME}/edit-user`, {user: user});
            });
    },
    postEditUser: function (req, res) {
        var id = req.params.id,
            userData = req.body;
        console.log(userData);
        users.edit(id, userData)
            .then(function (user) {
                res.redirect(`/${CONTROLLER_NAME}/users`);
            })
            .catch(function (err) {
                res.render(`${CONTROLLER_NAME}/edit-user`, {user: user});
            });
    }
};