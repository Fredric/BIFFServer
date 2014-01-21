Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        'Users'
    ],
    launch: function () {
        var socket = io.connect('http://localhost');
        socket.on('roomjoin', function (data) {
            console.log('someone joined a room');
            //socket.emit('my other event', { my: 'data' });
        });

        Ext.create('BIFF.view.Login').show()

    }
});
