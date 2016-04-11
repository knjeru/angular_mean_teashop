(function() {

  'use strict';

  angular
    .module('teaApp')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider','$httpProvider'];

    function config($stateProvider, $urlRouterProvider, $httpProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/app/home/views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .state('userHome', {
          url: '/:id/home',
          templateUrl: '/app/home/views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .state('register', {
          url: '/register',
          templateUrl: '/app/authorization/views/register.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/app/authorization/views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        })
        .state('profile', {
          url: '/profile/:id',
          templateUrl: '/app/userProfile/views/main.html',
          controller: 'CartCtrl',
          controllerAs: 'vm'
        })
        .state('profileEdit', {
          url: '/profile/:id/edit',
          templateUrl: '/app/userProfile/views/edit.html',
          controller: 'CartCtrl',
          controllerAs: 'vm'
        })
        .state('profile.order', {
          url: '/profile/:id/orders',
          templateUrl: '/app/userProfile/views/orders.html',
          controller: 'CartCtrl',
          controllerAs: 'vm'
        })
        .state('cart', {
          url: '/:id/checkout',
          templateUrl: '/app/checkout/views/cart.html',
          controller: 'CartCtrl',
          controllerAs: 'vm'
        });

        $httpProvider
          .interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers['x-access-token'] = $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
          }]);
      }
})();
