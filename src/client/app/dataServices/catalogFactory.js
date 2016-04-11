(function() {

  'use strict';

  angular
    .module('teaApp')
    .factory('catalogApiService', catalogApiService);

  catalogApiService.$inject = ['$http'];

  function catalogApiService ($http) {

    var urlBase = '/';
    var catalogAPI = {};

    catalogAPI.getAllItems = function() {
      return $http.get(urlBase);
    };

    catalogAPI.getOneItem = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    return catalogAPI;
  }
})();
