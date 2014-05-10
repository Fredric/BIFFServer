module.exports = function (server, app) {


    global.io = require('socket.io').listen(server);
    global.io.set('log level', 1);

    global.io.sockets.on('connection', function (socket) {
        socket.join('allconnections')
        socket.emit('connected', socket.id);


        global.io.sockets.in('allconnections').emit('globalmessage', 'A connection was registered in global room with id ' + socket.id)

        socket.on('clientAuthenticate', function (data) {

            socket.name = data.name;
            socket.join(data.name)


        });
    });


}