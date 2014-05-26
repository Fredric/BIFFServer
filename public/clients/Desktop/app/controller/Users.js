Ext.define('BIFF.controller.Users', {
    extend: 'Ext.app.Controller',
    config : {
        routes : {
            'users' : 'show'
        }
    },
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
//        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
//        viewport.layout.setActiveItem(viewport.add(this.getUsers()));





        var users = this.getUsers();
        if(users){
            users.destroy();
        }
        users = Ext.create('BIFF.view.Users', {
            session: BIFF.loginManager.getSession(),
            viewModel: {
                data: {
                    currentUser: BIFF.loginManager.getUser()
                }
            }
        });
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
        viewport.layout.setActiveItem(viewport.add(users));

        this.getUsersStore().load();
    }

});
