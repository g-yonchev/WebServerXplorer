var email = require('../../../node_modules/emailjs/email');
var Promise = require('bluebird');

var server = email.server.connect({
    user: "webxserverxplorer@abv.bg",
    password: "123456sedem",
    host: "smtp.abv.bg",
    ssl: true,
    port: 465
});

module.exports = {
    send: function (to, text) {
        console.log(to);
        return new Promise(function (resolve, reject) {
            server.send({
                text: "",
                from: "webxserverxplorer@abv.bg",
                to: to,
                cc: "",
                subject: "testing emailjs",
                attachment: [
                    {data: text, alternative: true}
                ]
            }, function (err, message) {
                if (err) {
                    reject(err);
                }

                resolve('Message sent successfully!')
            });
        });
    }
};
