Ext.define('BIFF.view.login.PassChangeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.passchangecontroller',

    config: {

        control: {
            '#'         : { boxready    : 'focusOnField'    },
            'textfield' : { keypress    : 'onKeyPress'      },
            'button'    : { click       : 'onButtonLogin'   }
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
            url: '/password/resetpassword',
            method:'PUT',
            scope: this,

            callback:function(a, b, c){
                if(b.response.statusText === 'OK'){
                    this.redirectTo('#auth/login');
                }
            },
            failure:function(a, b, c){
                if(b.response.statusText === 'OK'){
                    this.redirectTo('#auth/login');
                }else{
                    alert('Token probably expired. Make a new password change request')
                    this.redirectTo('#auth/reset');
                }
            }
        });
    }

});