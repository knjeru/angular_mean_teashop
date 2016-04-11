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
        console.log(data[0]);
        vm.catalog = data;
      });

      // Add item to user cart
      vm.addItem = function(id, body) {
        userApiService.addToCart(vm.cartItem)
        .success(function(data) {
          console.log(data);
        });
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

      vm.sort = false;

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
