var angular = require('angular');
var uiRouter = require('angular-ui-router')

angular
  .module('choiceView', [
    'ui.router',
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home.choiceView', {
        url: '/choiceView',
        views: {
          'container': {
            templateUrl:'./js/choiceView/templates/choiceView.html',
            controllerAs: 'ChoiceViewController as choiceViewCtrl'
          }
        }

      })
  });
