var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongo = require('mongodb'),
    mongodb = require('mongoskin'),
    passport = require('passport'),
    partials = require('express-partials');


var app = express();

app.configure('development',function(){
    require('./oauth.js')
    global.userDb = mongodb.db('mongodb://admin:admin@localhost:27017/users');
});

app.configure('production',function(){
    global.userDb = mongodb.db('mongodb://test:test@ds035488.mongolab.com:35488/heroku_app24702540/users');
});

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
   // app.set('view engine', 'ejs');
    app.use(express.favicon());
   // app.use(partials());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());


    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.session({ secret: 'keyboard cat' }));

    app.use(passport.initialize());
    app.use(passport.session());

});

require('./routes')(app);
require('./lib/localStrategy')(passport, app);
require('./lib/passreset')(app);


app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/clients/Desktop')
    } else {
        res.redirect('/clients/Desktop/#auth/login')
    }
});

app.get('/success', function (req, res) {
    res.redirect('/clients/Desktop/#')
});

app.get('/success2', function (req, res) {
    res.redirect('/clients/Desktop3')
});

app.get('/LoginLocal', function (req, res) {
    res.redirect('/clients/Desktop/#auth/login')
});


app.use(app.router);


if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/sockets')(server, app);



