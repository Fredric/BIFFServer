Ext.define('BIFF.controller.Routes', {
    extend: 'Ext.app.Controller',
    initPaths: function () {
        var me = this;

        //Navigation opening a project tab
        Path.map("#/login").to(function () {

            me.getController('Login').show();

        });

        Path.map("#/users").to(function () {

            me.getController('Users').show();

        });


        Path.root('#');
        Path.rescue(function () {
            Ext.Msg.alert('Error', 'You are on the wrong path!')
        });
        Path.listen();
    }
});
