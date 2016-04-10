(function() {

  'use strict';

  angular
    .module('teaApp')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/app/home/views/home.html',
          controller: 'CatalogCtrl',
          controllerAs: 'vm'
        })
        .state('register', {
          url: '/register',
          templateUrl: '/app/login/views/register.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/app/login/views/login.html',
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
    }

})();
