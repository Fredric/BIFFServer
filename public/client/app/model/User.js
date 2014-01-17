Ext.define('BIFF.model.User', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: ['username', '_id', 'email'],
    proxy: {
        type: 'rest',
        url: '/users'
    }

})