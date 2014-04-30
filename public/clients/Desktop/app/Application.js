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


        BIFF.socket = io.connect('http://localhost');
        BIFF.socket.on('roomjoin', function (data) {
            console.log('someone joined a room');

            //socket.emit('my other event', { my: 'data' });
        });

        BIFF.socket.on('authenticate', function (data) {
            debugger
            console.log('authenticated')
            //socket.emit('my other event', { my: 'data' });
        });



        // Ext.create('BIFF.view.Login').show()

    }
});
