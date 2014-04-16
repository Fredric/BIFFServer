Ext.define('BIFF.view.AppHeaderController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.appheadercontroller',
    init: function() {
        debugger
    },
    onLoginClick:function(){
       window.location = '/login'
    },
    onLogoutClick:function(){
        window.location = '/logout'
    }

});