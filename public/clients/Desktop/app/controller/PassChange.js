Ext.define('BIFF.controller.PassChange', {
    extend: 'Ext.app.Controller',

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

    show: function (params) {
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        viewport.layout.setActiveItem(viewport.add(this.getPassChange()));
        this.getPassChange().getForm().findField('token').setValue(params.token);
    }

});
