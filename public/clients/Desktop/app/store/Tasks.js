Ext.define('BIFF.store.Tasks',{
    extend:'Ext.data.Store',
    requires:[
    'BIFF.model.Task'
    ],
    model:'BIFF.model.Task',
    //autoSync:true,
    autoLoad:false

})