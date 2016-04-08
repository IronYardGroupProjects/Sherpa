var angular = require('angular');
var uiRouter = require('angular-ui-router');


angular
  .module('curExp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home.curexp', {
      url: '/curExp',
      views: {
        'container': {
          templateUrl: './js/curExp/templates/curExp.html',
          controllerAs: 'curExpController as ExpCtrl'
        }
      }
    })
  })
