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
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[

        {
            xtype: 'component',
            bind: '{currentUser.username}',
            margin: '0 10 0 0'
        },
        {
            flex:1,
            xtype:'tasks'
        }

    ]
})