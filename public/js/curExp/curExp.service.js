var angular = require('angular');

angular
  .module('curExp')
  .service('CurExpService', function($http, $q) {

// var CurExpService = {
//
//   url: '/perm-tour',
//   getTours: function () {
//     $http.get(CurExpService.url);
// }
// };
function getTours() {
  var defer = $q.defer();
  $http.get('/perm-tour')
    .then(function (data) {
      defer.resolve(data);
      console.log("yay you", data);
    })
return defer.promise;
}

  return {
    getTours: getTours
  }
});
