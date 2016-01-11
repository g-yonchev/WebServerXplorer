var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    // HOME
    app.get('/', function (req, res) {
        res.render('index');
    });

    // USERS
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);
    app.post('/login', auth.login);
    app.get('/login', controllers.users.getLogin);
    app.get('/logout', auth.isAuthenticated, auth.logout);
    
    // STORAGE
    app.get('/files', controllers.storage.getDir);
    app.get('/files/:id', controllers.storage.getDir);

    // FILE TRANSFER
    app.get('/upload-form', auth.isAuthenticated, controllers.fileTransfer.uploadForm);
    app.get('/upload-form/:id', auth.isAuthenticated, controllers.fileTransfer.uploadForm);
    app.post('/upload', auth.isAuthenticated, controllers.fileTransfer.upload);
    app.post('/upload/:id', auth.isAuthenticated, controllers.fileTransfer.upload);
    app.get('/download/:id', controllers.fileTransfer.download);


    // DEFAULT
    app.get('*', function(req, res) {
        res.render('index');
    });


};