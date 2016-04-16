var angular = require('angular');

angular
.module('sherpa')
.factory('MapService', function($http, $q, CacheService){
  var MapService = {
    getLocation: function(){
      var defer = $q.defer();
      navigator.geolocation.getCurrentPosition(function(position){
        defer.resolve(position);
      })
      return defer.promise;
    },
    getTourLocations: function(){
      var defer = $q.defer();
      $http.get('/tour').then(function(tour){
        defer.resolve(tour);
      });
      return defer.promise;
    },
    updateLocation: function(id){
      //id is the tour location join id
      var defer = $q.defer();
      $http.put('/tour/' + id).then(function(status){
        defer.resolve(status);
      });
      return defer.promise;
    },
    quitTour: function(){
      var defer = $q.defer();
      $http.delete('/tour').then(function(response){
        defer.resolve(response);
      });
      return defer.promise;
    }
  }
  return MapService;
});
