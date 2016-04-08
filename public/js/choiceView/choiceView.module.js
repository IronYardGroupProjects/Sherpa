var angular = require('angular');
var uiRouter = require('angular-ui-router')

angular
  .module('choiceViewModule', [
    'ui.router',
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('main.choiceView', {
        url: '/choiceView',
        templateUrl:'choiceView/templates/choiceView.html',
        controller: 'ChoiceViewController as choiceViewCtrl'
      })
  });
