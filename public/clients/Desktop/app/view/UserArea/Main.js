Ext.define('BIFF.view.UserArea.Main',{
    extend:'Ext.panel.Panel',
    controller: 'main',
    xtype:'main',
    viewModel: {
        type: 'main'
    },

    dockedItems:[
        {
            xtype:'appheader'
        }

    ],
    items:[

        {
            xtype: 'component',
            bind: '{currentUser.username}',
            margin: '0 10 0 0'
        }

    ]
})