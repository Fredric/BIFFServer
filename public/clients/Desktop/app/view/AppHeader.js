Ext.define('BIFF.view.AppHeader', {
    extend: 'Ext.toolbar.Toolbar',
    controller: 'appheadercontroller',
    viewModel:'appheader',
    xtype: 'appheader',
    items: [
        '->',
        {
            xtype   : 'image',
            width   : 32,
            height  : 32,
            bind:{
                src:'https://graph.facebook.com/{currentUser.facebookId}/picture?type=small'
            }
        },
        {

            bind:{
                icon:'/images/facebook.png',
                text:'{currentUser.username}'
            },
            scale:'large',

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