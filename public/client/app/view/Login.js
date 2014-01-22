Ext.define('BIFF.view.Login', {
    extend: 'Ext.panel.Panel',
    xtype:'login',

    initComponent: function () {
        var cp = Ext.create('Ext.state.CookieProvider', {
        });

        Ext.state.Manager.setProvider(cp);


        this.items = [

            {
                xtype: 'form',
                layout: 'anchor',
                buttonAlign: 'left',
                border: false,
                defaults: {
                    xtype: 'textfield',
                    hideLabel: true,
                    fieldStyle: {
                        fontSize: '18px',
                        color: '#666'
                    },
                    height: 40,
                    anchor: '100%'
                },

                items: [
                    {
                        name: 'username',
                        maxLength: 60,
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
                        emptyText: 'Lösenord',
                        name: 'password',
                        maxLength: 60,
                        inputType: 'password'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                xtype: 'button',
                scale: 'large',
                text: 'Login',
                scope: this,
                handler: function () {
                    this.onButtonLogin();
                }
            }
        ];

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
        var form = this.down('form');
        form.getForm().submit({
            url: '/login',
            scope: this,
            success: function (form, action) {
                //this.hide();
                window.location = '/client/#/users';
            },
            failure: function (response, action) {
                mask.hide();
                //response.findField(action.result.errorField).focus(true, 200);
                //response.findField(action.result.errorField).markInvalid(action.result.message);
            }
        });
    }
});