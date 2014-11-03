Ext.define('BIFF.model.Task', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        {   name: '_id'              , type: 'string', useNull:true     },
        {   name: 'username'         , type: 'string'                   },
        {   name: 'email'            , type: 'string'                   },
        {   name: 'password'         , type: 'string'                   },
        {   name: 'facebook'         , type: 'auto'                     }
    ],
    proxy: {
        type: 'rest',
        url: '/tasks',
        writer:{
            type:'json',
            writeAllFields:true
        }
    }
})