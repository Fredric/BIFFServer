module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function (socket) {
        console.log('Joining room');

        socket.join('room')

        io.sockets.in('room').emit('roomjoin')

//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//        console.log('My other event from client')
//  });
    });

}