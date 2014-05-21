Ext.define('BIFF.view.login.Login', {
    extend: 'Ext.form.Panel',
    controller: 'logincontroller',
    viewModel:'login',
    xtype: 'login',
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
            name: 'username',
            ui:'login',
            bind: '{username}',
            enableKeyEvents:true,
            maxLength: 60,
            allowBlank:false,
            emptyText: 'Användarnamn'
         },
        {
            emptyText: 'Lösenord',
            allowBlank:false,
            ui:'login',
            enableKeyEvents:true,
            name: 'password',
            maxLength: 60,
            inputType: 'password'
        },
        {
            xtype: 'button',
            itemId:'loginbutton',
            formBind:true,
            scale: 'medium',
            text: 'Login'
        },
        {
            xtype: 'button',
            itemId:'passreset',
            scale: 'small',
            text: 'Forgot password'
        }
    ]



});