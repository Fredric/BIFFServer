Ext.define('BIFF.controller.PassChange', {
    extend: 'Ext.app.Controller',
    config : {
        routes : {
            'changepassword/:token' : 'show'
        }
    },
    views: [
        'PassChange'
    ],

    refs: [
        {
            ref: 'passChange',
            selector: 'passchange',
            autoCreate: true,
            xtype:'passchange'
        }
    ],

    show: function (token) {
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
        viewport.layout.setActiveItem(viewport.add(this.getPassChange()));
        this.getPassChange().getForm().findField('token').setValue(token);
    }

});
