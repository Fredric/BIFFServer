Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',
    requires: [
        'Ext.ux.Router'
    ],

    controllers: [
        'Users', 'Login', 'Main', 'PassReset', 'PassChange'
    ],

    routes: {
        '/login': 'login#show',
        '/users': 'users#show',
        '/reset': 'passreset#show',
        '/changepassword/:token': 'passChange#show',

    },


    launch: function () {


        var socket = io.connect('http://localhost');
        socket.on('roomjoin', function (data) {
            console.log('someone joined a room');
            //socket.emit('my other event', { my: 'data' });
        });

        // Ext.create('BIFF.view.Login').show()

    }
});
