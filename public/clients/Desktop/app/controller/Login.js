Ext.define('BIFF.controller.Login', {
    extend: 'Ext.app.Controller',

    views: [
        'Login'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport',

        },
        {
            ref: 'login',
            selector: 'login',
            autoCreate: true,
            xtype:'login'
        }
    ],

    show: function () {

        var login = this.getViewport().add(this.getLogin());
        this.getViewport().layout.setActiveItem(login)
    }

});
