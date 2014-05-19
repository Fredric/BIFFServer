Ext.define('BIFF.view.login.PassChange', {
    extend: 'Ext.form.Panel',
    controller: 'passchangecontroller',
    xtype: 'passchange',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    buttonAlign: 'left',
    border: false,
    defaults: {
        xtype: 'textfield',
        hideLabel: true,
    },
    items : [
        {

            name:'token'
        },
        {
            name: 'password',
            ui:'login',
            maxLength: 60,
            allowBlank: false,
            emptyText: 'Password',
        },
        {
            name: 'confirm',
            ui:'login',
            maxLength: 60,
            allowBlank: false,
            emptyText: 'confirm',
        },
        {
            xtype: 'button',
            formBind: true,
            scale: 'medium',
            text: 'Ok',
            scope: this
        }
    ]



});