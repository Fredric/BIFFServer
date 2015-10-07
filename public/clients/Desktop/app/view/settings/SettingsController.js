/**
 * Created by fredricberling on 10/04/15.
 */
Ext.define('BIFF.view.settings.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings',
    requires:[
        'Ext.data.Store'
    ],
    /**
     * Called when the view is created
     */
    init: function() {
        var store = Ext.create('Ext.data.Store',{


        });

    }
});