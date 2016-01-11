var users = require('../services/users');

module.exports  = {
    getAllUsers: function (req, res) {
        users.getAll()
            .then(function (reqUsers) {
                res.render('admin/all-users', {users: reqUsers});
            })
    },
    editUser: function (req, res) {
        var id = req.params.id;
        console.log(id);
        users.getById(id)
            .then(function (user) {
                console.log(user);
                res.render('admin/edit-user', {user: user});
            })
    }
}