(function() {

  'use strict';

  angular
    .module('teaApp')
    .factory('userApiService', userApiService);

  userApiService.$inject = ['$http'];

  function userApiService ($http) {
    var urlBase = '/api/user';
    var userApi = {};

    userApi.getUser = function(id) {
      return $http.post(urlBase + '/' + id);
    };

    userApi.userUpdate = function(id, body) {
      return $http.put(urlBase + '/' + id + '/edit', body);
    };

    userApi.addToCart = function(id, body) {
      return $http.post(urlBase + '/' + id + '/cart/new', body);
    };

    userApi.deleteItem = function(id, body) {
      return $http.delete(urlBase + '/' + id + '/cart/delete', body);
    };

    userApi.newOrder = function(id, body) {
      return $http.post(urlBase + '/' + id + '/order/new', body);
    };

    userApi.confirmOrder = function(id, body) {
      return $http.post(urlBase + '/' + id + '/order/confirm', body);
    };

    return userApi;
  }
})();
