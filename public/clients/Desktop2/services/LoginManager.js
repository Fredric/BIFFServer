angular.module('LoginManagement', [])
    .factory('loginmanager', ['$http', function($http) {

        return {
            getUser: $http.get('/getUserInfo').success

        };

    }]);