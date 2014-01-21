/**
 * Module dependencies.
 *
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongo = require('mongodb'),
    monk = require('monk'),
    flash = require('connect-flash'),
    passport = require('passport');

//var httpProxy = require('http-proxy');
//var routes = require('./routes');

global.userDb = monk('localhost:27017/users');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(flash());
    /** PASSPORT *****/
    app.use(passport.initialize());
    app.use(passport.session());
  /*****************/
});

require('./routes')(app);
require('./lib/localStrategy')(passport, app);


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/sockets')(server);



