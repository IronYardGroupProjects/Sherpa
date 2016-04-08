var angular = require('angular');
require('angular-ui-router');
require('./node_modules/angular-simple-logger/dist/angular-simple-logger.min.js');
require('./node_modules/angular-google-maps/dist/angular-google-maps.js');

angular
  .module('sherpa', [
    'ui.router',
    'map',
    'choiceView',
    'curExp'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main.html'
      })
      $urlRouterProvider.otherwise('/404');
  });

require('./js/curExp');
require('./js/choiceView');
require('./js/map');
