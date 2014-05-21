Ext.define('BIFF.view.AppHeader', {
    extend: 'Ext.toolbar.Toolbar',
    controller: 'appheadercontroller',
    xtype: 'appheader',
    items: [
        '->',
        {
            xtype: 'button',
            text: 'Log out',
            listeners: {
                click: 'onLogoutClick'
            }
        }

    ]
});