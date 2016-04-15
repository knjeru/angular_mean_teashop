(function() {

  'use strict';

  angular
    .module('teaApp')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$stateParams', '$location', 'catalogApiService', 'userApiService', '$localStorage'];

    function HomeCtrl ($stateParams, $location, catalogApiService, userApiService, $localStorage) {
      var vm = this;
      vm.cartStatus = false;
      vm.sort = false;
      vm.category;
      vm.name;

      if ($localStorage.cart.length > 0) {
        vm.cartStatus = true;
      } else {
        $localStorage.cart = [];
        vm.cartStatus = false;
      }

      catalogApiService.getAllItems()
      .success(function(data) {
        vm.catalog = data;
      });

      // Add item to user localStorage cart
      vm.addItem = function(item, quantity) {
        for (var i = 0; i < quantity; i++) {
          $localStorage.cart.push(item);
        }
        vm.cartStatus = true;
      };

      vm.clearCart = function() {
        $localStorage.cart = [];
        vm.cartStatus = false;
      };

      vm.addQuantity =
        [{"value": 1},
          {"value": 2},
          {"value": 3},
          {"value": 4},
          {"value": 5},
          {"value": 6},
          {"value": 7},
          {"value": 8},
          {"value": 9},
          {"value": 10}];

      vm.category =
      [{"category": "spring"},
        {"category": "warm"},
        {"category": "winter"},
        {"category": "lucid"},
        {"category": "hot"},
        {"category": "dry"},
        {"category": "summer"},
        {"category": "awesome"},
        {"category": "cold"},
        {"category": "dark"}];

      vm.sortPrice =
      [{
          "value": "+price",
          "label": "Price low to high"
        },
        {
          "value": "-price",
          "label": "Price high to low"
        }];

    }
})();
