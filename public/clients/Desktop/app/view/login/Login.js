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
            bind: '{currentUser.username}',
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
            margins:'10 0 0 0',
            xtype: 'button',
            width: 200,
            scale: 'large',
            itemId:'login',
            formBind:true,

            text: 'Login'
        },
        {
            margin:'10 0 0 0',
            xtype: 'button',
            width: 200,
            scale: 'large',
            itemId:'passreset',
            text: 'Forgot password'
        },
        {
            margin:'10 0 0 0',
            xtype: 'button',
            width: 200,
            scale: 'large',
            icon:'/images/facebook.png',
            text: 'Facebook',
            handler: function () {
                window.location = '/auth/facebook'
            }
        }

    ]



});