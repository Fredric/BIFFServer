Ext.define('BIFF.view.UsersController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.userscontroller',
    init: function() {

    },

    onAddUser:function(){
        this.view.store.add({username: '', email: '', password:''})
    },
    onRemoveUser:function(){
        var selection = this.view.getSelectionModel().getSelection();
        if (selection.length !== 0){
            this.view.store.remove(selection[0])
        }
    }

});