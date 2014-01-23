Ext.define('Login.view.Select', {
    extend: 'Ext.Panel',
    config: {

        defaults: {
            margin: '10 10 10 10'
        },
        items: [
            {
                xtype: 'button',
                text: 'Local Strategy',
                handler: function () {
                    window.location = '/LoginLocal'
                }
            },
            {
                xtype: 'button',
                text: 'Facebook',
                handler: function () {
                    window.location = '/auth/facebook'
                }
            }
        ]
    }
});
