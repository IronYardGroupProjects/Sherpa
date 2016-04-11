var angular = require('angular');

angular
  .module('curExp')
  .service('CurExpService', function($http) {

var CurExpService = {

  url: '/perm-tour',
  getTours: function () {
    return $http.get(permTour);
  },
  getTour: function (id) {
    return $http.get(permTour + '/' + id);
  }
};
  return CurExpService;
      // getTour: getTour,
      // getTours: getTours
});
