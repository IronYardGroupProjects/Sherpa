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
    }
  }
  return MapService;
});
