Ext.define('BIFF.model.User', {
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
        url: '/users'
    }
})