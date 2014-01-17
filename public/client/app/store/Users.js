Ext.define('BIFF.store.Users',{
    extend:'Ext.data.Store',
    requires:[
    'BIFF.model.User'
    ],
    model:'BIFF.model.User',
    autoSync:true,
    autoLoad:true

})