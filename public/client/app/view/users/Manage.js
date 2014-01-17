Ext.define('BIFF.view.users.Manage', {
    extend: 'Ext.grid.Panel',
    xtype: 'usermanager',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1
        })
    ],

    columns: [
        {header: 'Name', dataIndex: 'username', editor: 'textfield'},
        {header: 'Email', dataIndex: 'email', flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }
    ],
    initComponent: function () {
        var me = this;
        me.store = Ext.StoreMgr.lookup('Users');

        me.tbar = [
            {
                text: 'Add',
                handler: function () {
                    me.store.add({username: '', email: ''})
                },
                scope: me
            },
            {
                text: 'Delete selected',
                handler: function () {
                    var selection = me.getSelectionModel().getSelection();
                    if (selection.length !== 0){
                        me.store.remove(selection[0])
                    }
                },
                scope: me
            },
            {
                text: 'commit',
                handler: function () {
                    me.store.sync();
                },
                scope: me
            }

        ]

        me.callParent();

    }
})