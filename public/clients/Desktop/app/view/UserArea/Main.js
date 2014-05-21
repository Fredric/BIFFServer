Ext.define('BIFF.view.UserArea.Main',{
    extend:'Ext.panel.Panel',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    items:[

        {
            xtype: 'component',
            bind: '{currentUser.username}',
            margin: '0 10 0 0'
        }

    ]
})