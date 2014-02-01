Ext.define('BIFF.controller.PassReset', {
    extend: 'Ext.app.Controller',

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
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        viewport.layout.setActiveItem(viewport.add(this.getPassReset()));
    }

});
