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
            $localStorage.token = res.token;
            $location.url(res.id + '/home');
        }

        var vm = this;

        vm.login = function () {
          var formData = {
              email: vm.email,
              password: vm.password
          };

          Auth.signin(formData, successAuth, function () {
              $rootScope.error = 'Invalid credentials.';
          });
        };

        vm.signup = function () {
          var formData = {
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
