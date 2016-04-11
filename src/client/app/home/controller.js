(function() {

  'use strict';

  angular
    .module('teaApp')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$stateParams', '$location', 'catalogApiService', 'userApiService'];

    function HomeCtrl ($stateParams, $location, catalogApiService, userApiService) {
      var vm = this;
      vm.cartItem = {};

      catalogApiService.getAllItems()
      .success(function(data) {
        console.log(data);
      });

      // Add item to user cart
      vm.addItem = function(id, body) {
        userApiService.addToCart(vm.cartItem)
        .success(function(data) {
          console.log(data);
        });
      };
    }
})();
