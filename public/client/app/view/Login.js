Ext.define('BIFF.view.Login', {
    extend: 'Ext.window.Window',


    width: 250,
    y: 200,
    closable: false,
    frame: false,
    border: false,
    resizable: false,
    draggable: false,
    shadow: false,
    ui: 'plain',

    initComponent: function () {
        this.buildApp();
        this.callParent();
        this.initListeners();
        this.show();
        this.down('textfield').focus(true, 500);

    },

    // Build app
    buildApp: function () {
        var cp = Ext.create('Ext.state.CookieProvider', {
        });

        Ext.state.Manager.setProvider(cp);

        this.items = [

            {
                height: 90,
                xtype: 'container',
                cls: 'login-logo',
                //TODO 4.2 logon margin bottom
                margin: '0 0 30 0'
            },
            {
                xtype: 'form',
                layout: 'anchor',
                buttonAlign: 'left',
                border: false,
                bodyStyle: {
                    background: 'transparent',
                    border: '0px'
                },
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
                        cls: 'login-name',
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
                        cls: 'login-pass',
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
            params: {
                width: window.outerWidth,
                height: window.outerHeight
            },
            scope: this,
            success: function (form, action) {
                this.hide();
                window.location = window.location.href;
            },
            failure: function (response, action) {
                mask.hide();
                response.findField(action.result.errorField).focus(true, 200);
                response.findField(action.result.errorField).markInvalid(action.result.message);
            }
        });
    }
});