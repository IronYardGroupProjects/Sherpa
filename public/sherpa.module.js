var angular = require('angular');
require('angular-ui-router');

angular
  .module('sherpa', [
    'ui.router',
    'map',
    'choiceView',
    'curExp'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'templates/main.html'
      })
      .state('home.main', {
        url: '/main',
        views: {
          'container': {
            templateUrl: 'templates/landing.html'
          }
        }
      })
      $urlRouterProvider.otherwise('/404');
  });

require('./js/curExp');
require('./js/choiceView');
require('./js/map');
