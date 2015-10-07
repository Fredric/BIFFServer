/**
 * Controller for header DIV
 */
angular.module('headerController', [])
    .controller('headerController', ['loginmanager', function (loginmanager) {
        var me = this;

        loginmanager.getUser().success(
            function (data) {
                if(data.success === true){
                    me.isLoggedIn = data.user.username
                }else{
                    me.isLoggedIn = 'Log in'
                }
            }
        );

    }]);


