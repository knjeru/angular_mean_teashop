(function() {

  'use strict';

  angular
    .module('teaApp')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$stateParams', '$location', 'catalogApiService'];

    function HomeCtrl ($stateParams, $location, catalogApiService) {
      var vm = this;

      catalogApiService.getAllItems()
      .success(function(data) {
        console.log(data);
      });
    }
})();
