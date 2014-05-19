Ext.define('BIFF.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.logincontroller',

    config: {

        control: {
            '#'                 : { boxready    : 'focusOnField'        },
            'textfield'         : { keypress    : 'onKeyPress'          },
            '#login'     : { click       : 'onButtonLogin'       },
            '#passreset' : { click       : 'onButtonPassReset'   }
        }
    },

    focusOnField:function(){
      this.view.down('textfield').focus(true, 500);
    },

    onKeyPress:function(field, e){
         if(e.getKey() === 13){
             this.onButtonLogin();
         }
    },
    onButtonLogin: function () {

        this.view.getForm().submit({
            url     : '/login',
            scope   : this,
            success : function (form, action) {
                BIFF.socket.emit('clientAuthenticate', { name: this.view.getForm().findField('username').getValue(), socketId: BIFF.socketId });
                Ext.History.add('#users')
            }
        });
    },
    onButtonPassReset: function () {

        this.redirectTo('#auth/reset')
    }

});