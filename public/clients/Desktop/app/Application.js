Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',
    requires: [
        // 'Ext.ux.Router'
    ],


    controllers: [
        'Users', 'auth.Root2', 'Main'
    ],


    launch: function () {

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

        this.isAuthenticated(function (a, b, c) {
            var resp = Ext.decode(c.responseText, true);
            if (resp && resp.success === true) {
                this.clientAuthenticate(resp.user.username);
            } else {
                //Ext.History.add('#auth/login')
            }
        });

    },
    isAuthenticated: function (callback) {
        Ext.Ajax.request({
            url: '/getUserInfo',
            callback: callback,
            scope: this
        })
    },

    clientAuthenticate: function (username) {
        BIFF.socket.emit('clientAuthenticate', { name: username, socketId: BIFF.socketId });

    }
});
