module.exports = function (server, app) {


    global.io = require('socket.io').listen(server);
    global.io.set('log level', 1);
    global.io.sockets.on('connection', function (socket) {
        console.log('Joining room');
        socket.join('allusers')

        global.io.sockets.in('allusers').emit('roomjoin')

//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//        console.log('My other event from client')
//  });
    });




}