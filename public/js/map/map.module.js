var angular = require('angular');
require('angular-ui-router');
require('angular-loading-bar');

angular
  .module('map', [
    'ui.router',
    'angular-loading-bar'
  ])
  .config(function($stateProvider) {
      $stateProvider
        .state('home.map',{
          url: '/map',
          views: {
            'container': {
              templateUrl: './js/map/templates/map.html',
              controller: 'MapController as MapCtrl'
            }
          },
          resolve: {
            location: function($q){
              var defer = $q.defer();
              navigator.geolocation.getCurrentPosition(
                function(position){
                  defer.resolve(position);
                }
              )
              return defer.promise;
            },
            tour: function($q, $http, $state){
              var defer = $q.defer();
              $http.get('/tour/locations').then(
                function(tour){
                  defer.resolve(tour);
                },
                function(error){
                  console.log(error);
                  $state.go('landing');
                }
              );
              return defer.promise;
            }
          }
        })
  })
