var angular = require('angular');

angular
  .module('curExp')
  .service('CurExpService', function($http) {

var CurExpService = {

  url: '/perm-tour',
  getTours: function () {
    return $http.get(permTour);
}
};
  return CurExpService;
      // getTour: getTour,
      // getTours: getTours
});
