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

    init: function () {
//        this.loginManager = Ext.create('BIFF.lib.LoginManager',{
//            session: this.view.getSession(),
//            model: 'User'
//        });

        this.loginManager = BIFF.loginManager;
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

        this.loginManager.login({
            data: this.view.getForm().getValues(),
            scope: this,
            success: 'onLoginSuccess',
            failure: 'onLoginFailure'
        });
    },
    onButtonPassReset: function () {

        this.redirectTo('#auth/reset')
    },
    onLoginFailure: function() {
        // Do something

    },

    onLoginSuccess: function(user) {

        this.redirectTo('userarea');
    }

});