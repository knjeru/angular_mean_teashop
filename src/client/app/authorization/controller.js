(function() {

  'use strict';

  angular
    .module('teaApp')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
      '$rootScope',
      '$location',
      '$localStorage',
      'Auth'
    ];

    function LoginCtrl ($rootScope, $location, $localStorage, Auth) {
      function successAuth(res) {
            $localStorage.val = res.id;
            $localStorage.token = res.token;
            $location.url('/');
        }

        var vm = this;

        if($localStorage.token) {
          $rootScope.user = true;
        } else {
          $rootScope.user = false;
        }

        console.log($localStorage.token + ' current user status: ' + $rootScope.user);

        vm.login = function () {
          var formData = {
              email: vm.email,
              password: vm.password
          };

          Auth.signin(formData, successAuth, function () {
              $rootScope.error = 'Invalid credentials.';
          });
        };

        vm.register = function () {
          var formData = {
              userName: vm.userName,
              firstName: vm.firstName,
              lastName: vm.lastName,
              email: vm.email,
              password: vm.password
          };

          Auth.signup(formData, successAuth, function () {
              $rootScope.error = 'Failed to signup';
          });
        };

        vm.logout = function () {
          Auth.logout(function () {
              $location.url('/');
          });
        };

        vm.token = $localStorage.token;
        vm.tokenClaims = Auth.getTokenClaims();
    }
})();
