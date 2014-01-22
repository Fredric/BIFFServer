Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',


    controllers: [
        'Routes', 'Users', 'Login'
    ],

    stores: [
        'Users'
    ],
    launch: function () {

       // Ext.util.History.init();

        this.getController('Routes').initPaths();

        var socket = io.connect('http://localhost');
        socket.on('roomjoin', function (data) {
            console.log('someone joined a room');
            //socket.emit('my other event', { my: 'data' });
        });

       // Ext.create('BIFF.view.Login').show()

    }
});
