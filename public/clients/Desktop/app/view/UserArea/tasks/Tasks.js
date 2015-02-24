Ext.define('BIFF.view.UserArea.tasks.Tasks', {
    extend: 'Ext.grid.Panel',
    xtype: 'tasks',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    bufferedRenderer:false,
    controller: 'taskscontroller',
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
            xtype:'toolbar',
            items:[
                {
                text: 'Add',
                listeners: {
                    click:'onAdd'
                }
            },
            {
                text: 'Delete selected',
                listeners:{
                    click:'onRemove'
                }
            }
            ]
        }

    ],
    initComponent: function () {
        var me = this;
        me.store = Ext.StoreMgr.lookup('Tasks');



        me.callParent();

    }
})