Ext.define('BIFF.view.UserArea.tasks.TasksController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.taskscontroller',
    init: function() {

    },

    onAdd:function(){
        debugger
        var rec = this.view.store.add({username: '', email: '', password:''})
        this.view.editingPlugin.startEdit(rec[0]);
    },
    onRemove:function(){
        var selection = this.view.getSelectionModel().getSelection();
        if (selection.length !== 0){
            this.view.store.remove(selection[0])
        }
    }

});