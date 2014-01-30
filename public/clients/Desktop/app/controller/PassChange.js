Ext.define('BIFF.controller.PassChange', {
    extend: 'Ext.app.Controller',

    views: [
        'PassChange'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport',

        },
        {
            ref: 'passchange',
            selector: 'passchange',
            autoCreate: true,
            xtype:'passchange'
        }
    ],

    show: function (token) {
        console.log(token)
        var passchange = this.getViewport().add(this.getPasschange());

        this.getViewport().layout.setActiveItem(passchange)
        passchange.getForm().findField('token').setValue(token);
    }

});
