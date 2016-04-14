var angular = require('angular');
require('angular-ui-router');
require('angular-animate');

angular
  .module('sherpa', [
    'ui.router',
    'map',
    'choiceView',
    'curExp',
    'near',
    'ngAnimate'
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
      $urlRouterProvider.otherwise('/',{});
  });

require('./js/curExp');
require('./js/choiceView');
require('./js/map');
require('./js/near');
