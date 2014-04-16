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
    passport = require('passport'),
    partials = require('express-partials');


//var httpProxy = require('http-proxy');
//var routes = require('./routes');

global.userDb = monk('localhost:27017/users');

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


app.get('/', function (req, res) {
    if(req.isAuthenticated()){
        res.redirect('/clients/Desktop/#users')
    }else{
        res.redirect('/clients/build/production/Login')
    }
});

app.get('/success', function (req, res) {


    res.redirect('/clients/Desktop/#users')
});

app.get('/LoginLocal', function (req, res) {
    res.redirect('/clients/Desktop/#login')
});

app.get('/test',function(req,res,next){
  res.render('login.ejs')
  // -> render layout.ejs with index.ejs as `body`.
})


app.use(app.router);


if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/sockets')(server, app);



