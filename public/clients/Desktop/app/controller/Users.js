Ext.define('BIFF.controller.Users', {
    extend: 'Ext.app.Controller',

    views: [
        'Users'
    ],
    stores: [
        'Users'
    ],
    refs: [
        {
            ref: 'users',
            selector: 'users',
            autoCreate: true,
            xtype: 'users'
        }
    ],
    show: function () {
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        viewport.layout.setActiveItem(viewport.add(this.getUsers()));

        this.getUsersStore().load();


    }

});
