/**
 * Created by fredricberling on 10/04/15.
 */
Ext.define('BIFF.view.settings.Settings', {
    requires: [
        'Ext.panel.Panel'
        /* include classes required by this component here */
    ],

    extend: 'Ext.Container',

    /*
    Uncomment to give this component an xtype
    xtype: 'settings',
    */

    viewModel: {
        type: 'settings'
    },
    controller: 'settings',

    items: [
        {
            xtype:'panel'
        }
    ]
});