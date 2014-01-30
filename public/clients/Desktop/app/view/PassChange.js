Ext.define('BIFF.view.PassChange', {
    extend: 'Ext.form.Panel',
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
        fieldStyle: {
            fontSize: '18px',
            color: '#666'
        },
        height: 40
    },


    initComponent: function () {


        this.items = [
            {

                name:'token'
            },
            {
                name: 'password',
                maxLength: 60,
                allowBlank: false,
                emptyText: 'Password',
            },
            {
                name: 'confirm',
                maxLength: 60,
                allowBlank: false,
                emptyText: 'confirm',
            },
            {
                xtype: 'button',
                formBind: true,
                scale: 'large',
                text: 'Ok',
                scope: this,
                handler: function () {
                    this.onButtonLogin();
                }
            }
        ]


        this.callParent();
        this.initListeners();


    },

    // Lyssnare
    initListeners: function () {

        var map = Ext.create('Ext.util.KeyMap', Ext.getBody(), {
            key: 13, // or Ext.EventObject.ENTER
            ctrl: false,
            shift: false,
            fn: this.onButtonLogin,
            scope: this
        });

    },

    // Check Login
    onButtonLogin: function () {
        var mask = new Ext.LoadMask(this, {msg: "Logging in..."});
        mask.maskCls = 'myMask';
        mask.show();
        this.getForm().submit({
            url: '/password/resetpassword',
            method:'PUT',
            scope: this,
            success: function (form, action) {

                debugger
            },
            failure: function () {
                console.log('callbak')
                mask.hide();
            }
        });
    }
});