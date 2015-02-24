Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',
    requires: [
        'Ext.layout.container.Card'
    ],


    controllers: [
        'Socket', 'Users', 'Auth', 'Main'
    ],


    launch: function () {



        var session = this.session = new Ext.data.Session();

        BIFF.loginManager = Ext.create('BIFF.lib.LoginManager',{
            session:session,
            model: 'BIFF.model.User'
        })

        BIFF.loginManager.isAuthenticated(function (success) {

            if (success === true || Ext.util.History.getToken().split('/')[0] === 'auth') {
                this.redirectTo(Ext.util.History.getHash() || 'userarea', true);
            } else {
                this.redirectTo('#auth/login')
            }
        }, this);

    }

});
