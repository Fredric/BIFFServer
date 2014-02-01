Ext.define('BIFF.controller.Login', {
    extend: 'Ext.app.Controller',

    views: [
        'Login'
    ],

    refs: [
        {
            ref: 'login',
            selector: 'login',
            autoCreate: true,
            xtype:'login'
        }
    ],

    show: function (params) {
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        viewport.layout.setActiveItem(viewport.add(this.getLogin()));
    }

});
