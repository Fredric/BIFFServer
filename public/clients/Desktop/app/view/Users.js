Ext.define('BIFF.view.Users', {
    extend: 'Ext.grid.Panel',
    xtype: 'users',


    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    controller: 'userscontroller',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1
        })
    ],

    columns: [
        {header: 'Name', dataIndex: 'username', editor: 'textfield'},
        {header: 'Password', dataIndex: 'password', editor: 'textfield'},
        {header: 'Email', dataIndex: 'email', flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }
    ],
    dockedItems:[
        {
            xtype:'appheader'
        },
        {
            xtype:'toolbar',
            items:[
                {
                text: 'Add',
                listeners: {
                    click:'onAddUser'
                }
            },
            {
                text: 'Delete selected',
                listeners:{
                    click:'onRemoveUser'
                }
            }
            ]
        }

    ],
    initComponent: function () {
        var me = this;
        me.store = Ext.StoreMgr.lookup('Users');



        me.callParent();

    }
})