Ext.define('BIFF.controller.PassReset', {
    extend: 'Ext.app.Controller',

    views: [
        'PassReset'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'viewport',

        },
        {
            ref: 'passreset',
            selector: 'passreset',
            autoCreate: true,
            xtype:'passreset'
        }
    ],

    show: function () {

        var passreset = this.getViewport().add(this.getPassreset());
        this.getViewport().layout.setActiveItem(passreset)
    }

});
