(function() {

  'use strict';

  angular
    .module('teaApp')
    .factory('Auth', Auth);

    Auth.$inject = ['$http', '$localStorage'];

    function Auth ($http, $localStorage) {
      var urlBase = '/auth';
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var tokenClaims = getClaimsFromToken();

        return {
            signup: function (data, success, error) {
                $http.post(urlBase+ '/register', data)
                 .success(success).error(error);
            },
            signin: function (data, success, error) {
                $http.post(urlBase+ '/login', data)
                 .success(success).error(error);
            },
            logout: function (success) {
                tokenClaims = {};
                delete $localStorage.token;
                success();
            },
            getTokenClaims: function () {
                return tokenClaims;
            }
        };   var urlBase = '/auth';
             function urlBase64Decode(str) {
                 var output = str.replace('-', '+').replace('_', '/');
                 switch (output.length % 4) {
                     case 0:
                         break;
                     case 2:
                         output += '==';
                         break;
                     case 3:
                         output += '=';
                         break;
                     default:
                         throw 'Illegal base64url string!';
                 }
                 return window.atob(output);
             }

             function getClaimsFromToken() {
                 var token = $localStorage.token;
                 var user = {};
                 if (typeof token !== 'undefined') {
                     var encoded = token.split('.')[1];
                     user = JSON.parse(urlBase64Decode(encoded));
                 }
                 return user;
             }

             var tokenClaims = getClaimsFromToken();

             return {
                 signup: function (data, success, error) {
                     $http.post(urlBase+ '/register', data)
                      .success(success).error(error);
                 },
                 signin: function (data, success, error) {
                     $http.post(urlBase+ '/login', data)
                      .success(success).error(error);
                 },
                 logout: function (success) {
                     tokenClaims = {};
                     delete $localStorage.token;
                     success();
                 },
                 getTokenClaims: function () {
                     return tokenClaims;
                 }
             };
    }

})();
