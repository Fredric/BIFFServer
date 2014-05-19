Ext.define('BIFF.view.login.PassReset', {
    extend: 'Ext.form.Panel',
    controller: 'passresetcontroller',
    xtype: 'passreset',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    buttonAlign: 'left',
    border: false,
    defaults: {
        xtype: 'textfield',
        hideLabel: true
    },
    items : [
        {
            name: 'email',
            ui:'login',
            maxLength: 60,
            allowBlank:false,
            emptyText: 'E-mail'

        },
        {
            xtype: 'button',
            formBind:true,
            scale: 'large',
            text: 'Reset password',
            scope: this
        }
    ]


});