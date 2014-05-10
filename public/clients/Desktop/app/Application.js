Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',
    requires: [
       // 'Ext.ux.Router'
    ],

    controllers: [
        'Users', 'Login', 'Main', 'PassReset', 'PassChange'
    ],


    launch: function () {


        BIFF.socket = io.connect('http://localhost:3000');
        BIFF.socket.on('personalmessage', function (data) {
            console.log('Personal socket message',data);
        });

        BIFF.socket.on('globalmessage', function (data) {
            console.log('Global message:' + data);
        });

        BIFF.socket.on('connected', function (data) {
            console.log('You was registered in socket as a connection', data)
            BIFF.socketId = data;
        });



        // Ext.create('BIFF.view.Login').show()

    }
});
