var angular = require('angular');
require('angular-ui-router');

angular
  .module('map', [
    'ui.router'
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
        })
  })
