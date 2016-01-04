var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.post('/login', auth.login);
    app.get('/login', controllers.users.getLogin);
    
    app.get('/logout', auth.isAuthenticated, auth.logout);

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};