var usersSvc = require('../services/users');
var fsSvc = require('../services/fileSystem');

var CONTROLLER_NAME = 'storage';

module.exports = {
    getDir: function (req, res, next) {
        var path = req.params.id || '/';
        if (path === '/' && !req.user) {
            path = '/public';
        }

        if (!req.user && path.indexOf('/public') !== 0) {
            path = '/public';
            req.session.error = 'Unauthorized request!';
            return res.redirect('/login');
        }

        fsSvc.readDir(path)
            .then(function (filesAndFolders) {
                res.render(`${CONTROLLER_NAME}/dir-list`, filesAndFolders);
            }, function (err) {
                 req.session.error = err.toString();
                 res.redirect('/');
            });
    },
};