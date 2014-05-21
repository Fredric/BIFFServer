Ext.define('BIFF.controller.Socket', {
    extend: 'Ext.app.Controller',
    init:function(){

        BIFF.socket = io.connect('http://localhost:3000');

        BIFF.socket.on('connected', function (data) {
            console.log('You was registered in socket as a connection', data)
            BIFF.socketId = data;
        });

        BIFF.socket.on('personalmessage', function (data) {
            console.log('Personal socket message', data);
        });

        BIFF.socket.on('globalmessage', function (data) {
            console.log('Global message:' + data);
        });

    }
})
