var usersSvc = require('../services/users');
var fsSvc = require('../services/fileSystem');

var CONTROLLER_NAME = 'file-transfer';

module.exports = {

    uploadForm: function (req, res, next) {
        var path = req.params.id || '/';
        urlSafePath = path.replace(/[/]/g, '%2F');
        res.render(CONTROLLER_NAME + '/upload-form', { urlSafePath });
    },

    postUploadForm: function (req, res, next) {

        var path = req.params.id || '/';
        var urlSafePath = path.replace(/[/]/g, '%2F');
        var username = req.user.username;

        req.pipe(req.busboy);

        req.busboy.on('file', function (fieldname, file, filename) {

            fsSvc.saveFile(file, path, filename);

        });

        req.busboy.on('finish', function () {
            res.redirect(`/files/${urlSafePath}`);
        });
    },
};