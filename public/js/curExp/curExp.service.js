var angular = require('angular');

angular
  .module('curExp')
  .service('CurExpService', function($http) {

var CurExpService = {

  url: '/perm-tour',
  getTours: function () {
    return $http.get(CurExpService.url);
}
};
  return CurExpService;
});
