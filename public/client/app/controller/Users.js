Ext.define('BIFF.controller.Users', {
    extend: 'Ext.app.Controller',

    views: [
        'Users'
    ],
    refs: [
            {
                ref: 'viewport',
                selector: 'viewport',

            },
            {
                ref: 'users',
                selector: 'users',
                autoCreate: true,
                xtype:'users'
            }
        ],
    show: function () {
        var users = this.getViewport().add(this.getUsers());
        this.getViewport().layout.setActiveItem(users)
        users.getStore().load();


    }

});
