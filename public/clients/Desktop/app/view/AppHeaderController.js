Ext.define('BIFF.view.AppHeaderController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.appheadercontroller',
    init: function() {

    },

    onLogoutClick:function(){
        window.location = '/logout'
    },
    onChangePasswordClick:function(){
        this.redirectTo('auth/reset')
    }

});