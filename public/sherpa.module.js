var angular = require('angular');
require('angular-ui-router');

angular
  .module('sherpa', [
    'ui.router',
    'map',
    'choiceView',
    'curExp',
    'near'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('landing',{
        url:'/',
        templateUrl:'templates/landing.html'
      })
      .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'templates/main.html'
      })
      .state('home.options',{
        url:'/options',
        views:{
            'container': {
              templateUrl:'templates/options.html'
            }
        }
      })
      .state('home.main', {
        url: '/main',
        views: {
          'container': {
            templateUrl: 'templates/landing.html'
          }
        }
      })
      $urlRouterProvider.otherwise('/404',{
          templateUrl:'templates/404.html'
        });
  });

require('./js/curExp');
require('./js/choiceView');
require('./js/map');
require('./js/near');
