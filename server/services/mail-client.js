var email = require("email");
var Promise = require('bluebird');

var server = email.server.connect({
    user: "webxserverxplorer@abv.bg",
    password: "123456sedem",
    host: "smtp.abv.bg",
    ssl: true
});

module.exports = {
    sendMail: function (mail) {
        var promise = new Promise(function (resolve, reject) {
            server.send({
                text: mail.text,
                from: "webxserverxplorer@abv.bg",
                to: mail.to,
                cc: "",
                subject: "testing emailjs",
                attachment: [
                    //TODO: html for the messages
                    {data: "<html>i <i>hope</i> this works!</html>", alternative: true}
                ]
            }, function (err, message) {
                if (err) {
                    reject(err);
                }

                resolve('Message sent successfully!')
            });
        });

        return promise;
    }
};