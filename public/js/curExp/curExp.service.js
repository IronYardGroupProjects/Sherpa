var angular = require('angular');

angular
  .module('curExp')
  .factory('CurExpService', function($http) {

    var permTour = '/perm-tour';

    var getTours = function () {
      return $http.get(permTour)
    }
    var getTour = function (id) {
      return $http.get(permTour + '/' + id)
    }

  return {
      getTour: getTour,
      getTours: getTours
  }

});
