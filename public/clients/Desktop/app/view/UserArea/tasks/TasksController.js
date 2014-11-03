Ext.define('BIFF.view.UserArea.tasks.TasksController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.taskscontroller',
    init: function() {

    },

    onAdd:function(){
        this.view.store.add({username: '', email: '', password:''})
    },
    onRemove:function(){
        var selection = this.view.getSelectionModel().getSelection();
        if (selection.length !== 0){
            this.view.store.remove(selection[0])
        }
    }

});