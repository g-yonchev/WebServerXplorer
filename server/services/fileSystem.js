var fs = require('fs');

var FILES_DIR = './files';

module.exports = {

    createDir: function (path, dirName) {
        dirName = dirName || '';

        try {
            fs.mkdirSync(FILES_DIR + path + dirName);
        } catch (e) {
            console.log(e);
            if (e.code === 'EEXIST') {
                // todo: clear user dir
            } else {
                throw e;
            }
        }
    },

    saveFile: function (file, path, filename) {

        if (!fs.existsSync(FILES_DIR + path)) {
            this.createDir(path);
        }

        var fstream = fs.createWriteStream(FILES_DIR + path + filename);
        file.pipe(fstream);
    },

    // returns a list of paths to files
    readDir: function (path, cb) {
        fs.readdir(path, function (err, contents) {
            if (err) {
                throw err;
            }

            contents = contents.map(function (contentName) {
                return path + contentName;
            });

            cb(contents);
        });
    }
};
