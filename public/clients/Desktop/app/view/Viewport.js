Ext.define('BIFF.view.Viewport', {
    extend: 'Ext.panel.Panel',
    itemId:'bodycardpanel',
    dockedItems:[
        {
            xtype:'appheader',
            dock:'top'
        }
    ],
    layout: 'card'

});
