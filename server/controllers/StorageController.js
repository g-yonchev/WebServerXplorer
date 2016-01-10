var usersSvc = require('../services/users');
var fsSvc = require('../services/fileSystem');

var CONTROLLER_NAME = 'storage';

module.exports = {
    getDir: function (req, res, next) {
        // todo: check if user is registered
        var urlSafePath = req.params.id || '';
        if (urlSafePath === '' && !req.user) {
            urlSafePath = 'public';
        }

        var path = urlSafePath.replace(/%2F/g, '/');
        fsSvc.readDir(`${path}`)
            .then(function (filesAndFolders) {
                res.render(`${CONTROLLER_NAME}/dir-list`, filesAndFolders);
            }, function (err) {
                 req.session.error = err.toString();
                 res.redirect('/');
            });
    },
};