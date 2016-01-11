var usersSvc = require('../services/users');
var fsSvc = require('../services/fileSystem');

var CONTROLLER_NAME = 'file-transfer';

module.exports = {

    uploadForm: function (req, res, next) {
        var path = req.params.id || '/';
        urlSafePath = path.replace(/[/]/g, '%2F');
        res.render(CONTROLLER_NAME + '/upload-form', { urlSafePath });
    },

    upload: function (req, res, next) {

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
    download: function (req, res, next) {
        var fileUrl = req.params.id;
        var filePath = encryption.decrypt(fileUrl, URL_PASSWORD);

        var fileInfo = files.getFileByUrl(fileUrl)
            .then(function (fileInfo) {
                return fileInfo.fileName;
            })
            .then(function (fileName) {
                res.download(__dirname + '/../../files' + filePath, fileName);
            }, function (err) {
                console.log(err);
            });
    },
};