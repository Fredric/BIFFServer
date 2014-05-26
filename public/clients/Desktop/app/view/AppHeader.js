Ext.define('BIFF.view.AppHeader', {
    extend: 'Ext.toolbar.Toolbar',
    controller: 'appheadercontroller',
    viewModel:'appheader',
    xtype: 'appheader',
    items: [
        '->',
        {

            bind:'{currentUser.username}',
            menu      : [
                {
                    text: 'Log out',
                    listeners: {
                        click: 'onLogoutClick'
                    }
                },
                {
                    text: 'Item 1',
                    text: 'Change password',
                    listeners: {
                        click: 'onChangePasswordClick'
                    }
                }

            ]
        }

    ]
});