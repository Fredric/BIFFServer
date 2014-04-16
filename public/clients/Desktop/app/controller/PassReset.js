Ext.define('BIFF.controller.PassReset', {
    extend: 'Ext.app.Controller',
    config : {
        routes : {
            'reset' : 'show'
        }
    },
    views: [
        'PassReset'
    ],

    refs: [
        {
            ref: 'passReset',
            selector: 'passreset',
            autoCreate: true,
            xtype: 'passreset'
        }
    ],

    show: function () {
        var viewport = Ext.ComponentQuery.query('#bodycardpanel')[0];
        viewport.layout.setActiveItem(viewport.add(this.getPassReset()));
    }

});
