(function() {

  'use strict';

  angular
    .module('teaApp')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$stateParams', '$location', 'catalogApiService'];

    function HomeCtrl ($stateParams, $location, catalogApiService) {
      var vm = this;
      vm.cartItem = {};

      catalogApiService.getAllItems()
      .success(function(data) {
        console.log(data);
      });

      // Add item to user cart
      vm.addItem = function(id, body) {

      };
    }
})();
