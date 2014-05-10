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


        BIFF.socket = io.connect('http://sleepy-beach-6260.herokuapp.com');
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

    },
    isLoggedIn:function(){


    }
});
