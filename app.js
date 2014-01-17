
/**
 * Module dependencies.
 */



var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');

global.userDb = monk('localhost:27017/users');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//
//app.use(function(req, res, next){
//    res.db = monk('localhost:27017/users');
//    next();
//});



app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

/***************** U S E R S ********************/
app.get('/users', user.list);
app.get('/users/:id', user.getOne);
app.put('/users/:id', user.putOne);
app.post('/users', user.create);
app.delete('/users/:id', user.deleteOne);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
