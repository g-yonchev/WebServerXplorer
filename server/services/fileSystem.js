var fs = require('fs');

var FILES_DIR = './files';

module.exports = {

    createDir: function (path, dirName) {
        dirName = dirName || '';

        try {
            fs.mkdirSync(FILES_DIR + path + dirName);
        } catch (e) {
            console.log(e);
            if (e.code !== 'EEXIST') {
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

    // returns a list of paths to files and dirs
    readDir: function (path) {
        path = FILES_DIR + path || FILES_DIR;

        return new Promise(function (resolve, reject) {

            fs.readdir(path, function (err, contents) {
                if (err) {
                    reject(err);
                    return;
                }

                contents = contents.map(function (contentName) {
                    return contentName;
                });

                resolve(contents);
            });
        });
    }
};
