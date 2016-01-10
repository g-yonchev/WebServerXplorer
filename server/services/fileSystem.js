var fs = require('fs');
var pathSvc = require('path');

var BASE_DIR = './files';

module.exports = {

    createDir: function (path, dirName) {
        dirName = dirName || '';

        try {
            fs.mkdirSync(BASE_DIR + path + dirName);
        } catch (e) {
            console.log(e);
            if (e.code !== 'EEXIST') {
                throw e;
            }
        }
    },

    saveFile: function (file, path, filename) {

        if (!fs.existsSync(BASE_DIR + path)) {
            this.createDir(path);
        }

        var fstream = fs.createWriteStream(BASE_DIR + path + filename);
        file.pipe(fstream);
    },

    // returns a list of dirs and files
    readDir: function (path) {

        path = path || "";
        fullPath = BASE_DIR + "/" + path;
        urlSafePath = path.replace(/[/]/g, '%2F');

        return new Promise(function (resolve, reject) {

            fs.readdir(fullPath, function (err, fileFolders) {
                if (err) {
                    reject(err);
                    return;
                }

                fileFolders = fileFolders
                    .map(function (itemName) {
                        return pathSvc.join(fullPath, itemName);
                    });

                var files = fileFolders                    
                    .filter(function (item) {
                        return fs.statSync(item).isFile();
                    })
                    .map(function (file) {
                        var fileName = pathSvc.basename(file);
                        return {
                            name: fileName,
                            path: `${urlSafePath}%2F${fileName}`
                        };
                    });
                files = files || [];

                var dirs = fileFolders                    
                    .filter(function (item) {
                        return !fs.statSync(item).isFile();
                    })
                    .map(function (dir) {
                        var dirName = pathSvc.basename(dir);
                        return {
                            name: dirName,
                            path: `${urlSafePath}%2F${dirName}`        
                        };
                    });
                dirs = dirs || [];

                resolve({
                    parent: pathSvc.dirname(path).replace(/[/]/g, '%2F'),
                    path,
                    dirs,
                    files
                });
            });
        });
    }
};
