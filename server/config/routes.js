var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', auth.isInRole('admin'), controllers.users.getRegister);
    app.post('/register', auth.isInRole('admin'), controllers.users.postRegister);

    app.post('/login', auth.login);
    app.get('/login', controllers.users.getLogin);

    app.post('/reset-password', controllers.users.postResetPassword);
    app.get('/reset-password', controllers.users.getResetPassword);

    app.post('/change-password/:token', controllers.users.postChangePassword);
    app.get('/change-password/:token', controllers.users.getChangePassword);

    app.get('/admin/users', controllers.admin.getAllUsers);
    app.get('/admin/user/edit/:id', controllers.admin.editUser);
    
    app.get('/logout', auth.isAuthenticated, auth.logout);

    app.get('/dir-list-public', controllers.storage.getDirListPublic);
    
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};