var angular = require('angular');
require('angular-ui-router');
var _ = require('lodash');
require('../../node_modules/angular-simple-logger/dist/angular-simple-logger.min.js');
require('../../node_modules/angular-google-maps/dist/angular-google-maps.js');

angular
  .module('map', [
    'ui.router',
    'uiGmapgoogle-maps'
  ])

  .config(function(uiGmapGoogleMapApiProvider, $stateProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyBDYqypuGrpUQn2SCTzz9mvwy6-Eb55UZA',
          v: '3.20',
          libraries: 'weather,geometry,visualization'
      });
      $stateProvider
        .state('home.map',{
          url: '/map',
          views: {
            'container': {
              templateUrl: './js/map/templates/map.html',
              controllerAs: 'MapController as MapCtrl'
            }
          },
        })
  })
