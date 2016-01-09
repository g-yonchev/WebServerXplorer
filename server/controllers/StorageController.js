var usersSvc = require('../services/users');
var fsSvc = require('../services/fileSystem');

var CONTROLLER_NAME = 'storage';

module.exports = {
    getDirListPublic: function (req, res, next) {
        var paths = fsSvc.readDir('/public')
            .then(function (paths) {
                res.render(`${CONTROLLER_NAME}/dir-list`, { paths });
            }, function (err) {
                 req.session.error = err;
                 res.redirect('/');
            });
    },
};