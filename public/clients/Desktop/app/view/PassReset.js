Ext.define('BIFF.view.PassReset', {
    extend: 'Ext.form.Panel',
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
        hideLabel: true,
        fieldStyle: {
            fontSize: '18px',
            color: '#666'
        },
        height: 40
    },


    initComponent: function () {
        var cp = Ext.create('Ext.state.CookieProvider', {
        });

        Ext.state.Manager.setProvider(cp);


        this.items = [
            {
                name: 'username',
                maxLength: 60,
                allowBlank:false,
                emptyText: 'Användarnamn',
                stateful: true,
                stateId: 'SignonStateId',
                stateEvents: ['valid', 'blur'],
                getState: function () {
                    return {
                        value: this.getValue()
                    };
                },
                applyState: function (state) {
                    this.setValue(state.value);
                }
            },
            {
                xtype: 'button',
                formBind:true,
                scale: 'large',
                text: 'Reset password',
                scope: this,
                handler: function () {
                    this.onButtonLogin();
                }
            }
        ]


        this.callParent();
        this.initListeners();

        this.down('textfield').focus(true, 500);

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
            url: '/password/reset',
            scope: this,
            success: function (form, action) {


            },
            failure:function(){
                console.log('callbak')
                mask.hide();
            }
        });
    }
});