Ext.define('BIFF.controller.Auth', {
    extend: 'Ext.app.Controller',
    config: {
        routes: {
            'auth/login': 'showLogin',
            'auth/changepassword/:token': 'showChangePassword',
            'auth/reset': 'showPassReset'
        }
    },
    views: [
        'login.Login',
        'login.PassReset',
        'login.PassChange',

    ],

    refs: [
        {
            ref: 'login',
            selector: 'login',
            xtype: 'login'
        },
        {
            ref: 'passChange',
            selector: 'passchange',
            autoCreate: true,
            xtype: 'passchange'
        },
        {
            ref: 'passReset',
            selector: 'passreset',
            autoCreate: true,
            xtype: 'passreset'
        }
    ],

    showLogin: function (params) {
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0],
            login = this.getLogin();
        if (login) {
            login.destroy();
        }

        login = Ext.create('BIFF.view.login.Login', {
            session: BIFF.loginManager.getSession(),
            viewModel: {
                data: {
                    currentUser: BIFF.loginManager.getUser()
                }
            }
        });

        viewport.layout.setActiveItem(viewport.add(login));
    },
    showChangePassword: function (token) {
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
        viewport.layout.setActiveItem(viewport.add(this.getPassChange()));
        this.getPassChange().getForm().findField('token').setValue(token);
    },
    showPassReset: function () {
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];

        viewport.layout.setActiveItem(viewport.add(this.getPassReset()));
    }


});
