Ext.define('BIFF.view.AppHeader',{
    extend: 'Ext.toolbar.Toolbar',
    xtype:'appheader',
    items:[
        '->',
        {
            xtype:'button',
            text:'Log out',
            handler:function(){
                window.location = '/logout'
            }
        }
    ]
});