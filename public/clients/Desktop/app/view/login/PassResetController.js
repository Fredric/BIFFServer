Ext.define('BIFF.view.login.PassResetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.passresetcontroller',

    config: {

        control: {
            '#':            { boxready: 'focusOnField'    },
            'textfield':    { keypress: 'onKeyPress'      },
            'button':       { click: 'onButtonLogin'   }
        }
    },

    focusOnField: function () {
        this.view.down('textfield').focus(true, 500);
    },

    onKeyPress: function (field, e) {
        if (e.getKey() === 13) {
            this.onButtonLogin();
        }
    },
    onButtonLogin: function () {
        this.view.getForm().submit({
            url: '/password/reset',
            scope: this,
            success: function (form, action) {

                this.redirectTo('#auth/login')

            },
            failure: function () {

            }
        });
    }

});