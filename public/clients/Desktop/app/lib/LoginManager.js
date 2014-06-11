Ext.define('BIFF.lib.LoginManager', {
    config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.session.Session} session
         */
        session: null,

        user: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    applyModel: function (model) {
        return model && Ext.data.schema.Schema.lookupEntity(model);
    },

    login: function (options) {
//        this.view.getForm().submit({
//            url     : '/login',
//            scope   : this,
//            success : function (form, action) {
//                BIFF.socket.emit('clientAuthenticate', { name: this.view.getForm().findField('username').getValue(), socketId: BIFF.socketId });
//                Ext.History.add('#users')
//            }
//        });

        Ext.Ajax.request({
            url: '/login',
            method: 'POST',
            jsonData: options.data,
            scope: this,
            callback: this.onLoginReturn,
            original: options
        });
    },

    onLoginReturn: function (options, success, response) {
        options = options.original;
        var resultSet;

        if (success) {

            resultSet = this.realizeUserFromResponse(response);

            if (resultSet.getSuccess()) {
                Ext.callback(options.success, options.scope, [this.getUser()]);
                return;
            }
        }


        Ext.callback(options.failure, options.scope, [response, resultSet]);
    },

    realizeUserFromResponse: function (response) {
        var session = this.getSession();
        var resultSet;
        resultSet = this.getModel().getProxy().getReader().read(response, {
            recordCreator: session ? session.recordCreator : null
        });
        this.setUser(resultSet.getRecords()[0]);

        return resultSet;

    },
    createUserFromData: function (data) {
        var session = this.getSession();
        if (!this.getUser()) {
            this.setUser(session.createRecord('BIFF.model.User', data));
        }
    },
    isAuthenticated: function (callback, scope) {
        Ext.Ajax.request({
            url: '/getUserInfo',
            callback: function (a, b, c) {
                var resp = Ext.decode(c.responseText, true);
                if (resp && resp.success === true) {
                    this.clientAuthenticate(resp.user.username);
                    this.createUserFromData(resp.user)
                    callback.call(scope, true);
                } else {
                    callback.call(scope, false);
                }
            },
            scope: this
        })
    },

    clientAuthenticate: function (username) {
        BIFF.socket.emit('clientAuthenticate', { name: username, socketId: BIFF.socketId });

    }

});