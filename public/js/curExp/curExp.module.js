var angular = require('angular');
var uiRouter = require('angular-ui-router');


angular
  .module('CurExp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('main.curExp', {
      url: '/curExp',
      templateUrl: 'curExp/templates/curExp.html',
      controller: 'curExpController as ExpCtrl'
    })
  })
