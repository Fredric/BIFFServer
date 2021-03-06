Ext.define('BIFF.controller.Main', {
    extend: 'Ext.app.Controller',
    config : {
        routes : {
            'userarea'                 : 'openUserArea'
        }
    },
    views: [
        'AppHeader',
        'UserArea.tasks.Tasks',
        'UserArea.Main'
    ],
    refs: [

        {
            ref: 'main',
            selector: 'main'


        }
    ],
    stores: [
        'Tasks'
    ],
    listen: {
        controller: {
            // Listen for the LoginController ("controller.login" alias) to fire its
            // "login" event.
            logincontroller: {
                login: 'openUserArea'
            }
        }

    },

    openUserArea: function () {
        var main = this.getMain();
        if(main){
          main.destroy();
        }
        main = Ext.create('BIFF.view.UserArea.Main', {
            session: BIFF.loginManager.getSession(),
            viewModel: {
                data: {
                    currentUser: BIFF.loginManager.getUser()
                }
            }
        });
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
        viewport.layout.setActiveItem(viewport.add(main));
        this.getTasksStore().load();
        this.getTasksStore().on('datachange', function(){
            BIFF.socket.emit('taskschanged', {socketId: BIFF.socketId });
        });

    }
});
