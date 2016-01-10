var email = require('../utils/mail/mail-client'),
    jade = require('jade');

var PATH_TO_EMAILS = __dirname + './../utils/mail/mail-text';

function compile(path, data) {
    var fn = jade.compileFile(PATH_TO_EMAILS + path, {});
    return fn(data);
}

module.exports = {
    register: function (user) {
        console.log(user);
        var text = compile('/register.jade', user);
        return email.send(user.email, text);
    }
};