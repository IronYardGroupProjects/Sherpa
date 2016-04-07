var angular = require('angular');
var uiRouter = require('angular-ui-router')

angular
  .module('sherpa', [
    'ui.router',
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main',
        url: '/',
        template: 'main.html',
        abstract: true
      )
  });

require('./js/curExp');
require('./js/choiceView');
