module.exports = function (app) {

    var passreset = require('pass-reset');
    var handlebars = require('handlebars');
    var Users = global.userDb.collection('usercollection');
    var Tokens = global.userDb.collection('tokens');
    var nodemailer = require("nodemailer");

    if(typeof(process.env.PRODUCTION) === 'undefined'){
        var config = require('../oauth.js')
    }

    // create reusable transport method (opens pool of SMTP connections)
    var mailer = nodemailer.createTransport("SMTP", {
        host: "smtp.otydligt.se", // hostname
        secureConnection: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
            user: process.env.MAILERAUTHUSER,
            pass: process.env.MAILERAUTHPASS
        }
    });

    passreset.storage.setStore({
        create: function (id, token, callback) {
            console.log('CREATE')
            Tokens.insert({id: id, token: token}, {safe: true}, callback);
        },
        lookup: function (token, callback) {
            console.log('LOOKUP')
            Tokens.findOne({token: token}, callback);
        },
        destroy: function (token, callback) {
            console.log('DESTROY')
            Tokens.remove({token: token}, {safe: true}, callback);
        }
    });

    //
    // Custom storage models would be initilaized here, but we
    // will just use the default memory store
    //

    //
    // Configure the user lookup routine
    //
    passreset.lookupUsers(function (login, callback) {
        debugger
        Users.findOne({ email: login }, function (err, user) {
            if (err) {
                return callback(err);
            }
            callback(null, {
                email: user.email,
                users: [
                    {
                        id: user._id.toString(),
                        name: user.username
                    }
                ]
            });
        });
    });

    //
    // Configure the set password routine
    //
    passreset.setPassword(function (id, password, callback) {

        var update = { password: password };

        Users.updateById(id.id, {$set: update}, function (err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, true);
        });
    });

    //
    // Configure the send email routine
    //
    passreset.sendEmail(function (email, resets, callback) {
        var template = handlebars.compile([
            '<p>You requested a password reset for the following account(s).</p>',
            '<ul>',
            '{{#each resets}}',
            '<li>{{name}}: <a href="{{url}}">{{url}}</a></li>',
            '{{/each}}',
            '</ul>'
        ].join('\n'));
        mailer.sendMail({
            to: email,
            from: 'fredric.berling@gmail.com',
            subject: 'password reset',
            html: template({ resets: resets })
        }, function (error, responseStatus) {
            console.log(error)
            if (!error) {
                console.log(responseStatus.message); // response from the server
                console.log(responseStatus.messageId); // Message-ID value used
            }
        });
        callback(null, true);
    });
};