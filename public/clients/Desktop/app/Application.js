Ext.define('BIFF.Application', {
    name: 'BIFF',

    extend: 'Ext.app.Application',
    requires: [
        // 'Ext.ux.Router'
    ],


    controllers: [
        'Socket', 'Users', 'Auth', 'Main'
    ],


    launch: function () {



        var session = this.session = new Ext.data.session.Session();

        BIFF.loginManager = Ext.create('BIFF.lib.LoginManager',{
            session:session,
            model: 'User'
        })

        BIFF.loginManager.isAuthenticated(function (success) {
            if (success === true) {

                this.redirectTo(Ext.util.History.getHash() || 'userarea', true);
            } else {
                this.redirectTo('#auth/login')
            }
        }, this);

    }

});
