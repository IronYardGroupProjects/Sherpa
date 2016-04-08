var angular = require('angular');
var uiRouter = require('angular-ui-router')

angular
  .module('map', [
    'ui.router',
    'uiGmapgoogle-maps'
  ])
  .config(function(uiGmapGoogleMapApiProvider, $stateProvider, $urlRouterProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyBDYqypuGrpUQn2SCTzz9mvwy6-Eb55UZA',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
      $stateProvider
        .state('main.map',
          url: '/map',
          templateUrl: 'map/templates/map.html',
          controller: 'MapController as MapCtrl'
  })
