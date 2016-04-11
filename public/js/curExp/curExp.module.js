var angular = require('angular');
require('angular-ui-router');


angular
  .module('curExp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home.curExp', {
      url: '/curExp',
      views: {
        'container': {
          templateUrl: './js/curExp/templates/curExp.html',
          controllerAs: 'curExpController as ExpCtrl'
        }
      },
    })
  })
