Ext.define('BIFF.controller.Main', {
    extend: 'Ext.app.Controller',
    config : {
        routes : {
            'userarea'                 : 'openUserArea'
        }
    },
    views: [
        'AppHeader',
        'UserArea.Main'
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

        this.main = Ext.create('BIFF.view.UserArea.Main', {
            session: BIFF.loginManager.getSession(),
            viewModel: {
                data: {
                    currentUser: BIFF.loginManager.getUser()
                }
            }
        });
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
        viewport.layout.setActiveItem(viewport.add(this.main));
    }
});
