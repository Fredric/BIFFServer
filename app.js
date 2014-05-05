/**
 * Module dependencies.
 *
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongo = require('mongodb'),
    mongodb = require('mongoskin'),

    monk = require('monk'),
    flash = require('connect-flash'),
    passport = require('passport'),
    partials = require('express-partials');


//var httpProxy = require('http-proxy');
//var routes = require('./routes');


if (typeof(process.env.PRODUCTION) === 'undefined') {
    require('./oauth.js')
    global.userDb = mongodb.db('mongodb://admin:admin@localhost:27017/users');
} else {
    global.userDb = mongodb('mongodb://test:test@ds035488.mongolab.com:35488/heroku_app24702540/users');
}


var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(partials());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());


    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(flash());
    /** PASSPORT *****/

    app.use(passport.initialize());
    app.use(passport.session());
    /*****************/

});

require('./routes')(app);
require('./lib/localStrategy')(passport, app);
require('./lib/passreset')(app);
//require('./lib/connections')(app);





app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/clients/Desktop/#users')
    } else {
        res.redirect('/clients/build/production/Login')
    }
});

app.get('/success', function (req, res) {


    res.redirect('/clients/Desktop/#users')
});

app.get('/LoginLocal', function (req, res) {
    res.redirect('/clients/Desktop/#login')
});



app.use(app.router);


if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/sockets')(server, app);



