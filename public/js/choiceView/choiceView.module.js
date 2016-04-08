var angular = require('angular');
require('angular-ui-router')

angular
  .module('choiceView', [
    'ui.router',
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('main.choiceView', {
        url: '/choiceView',
        templateUrl:'js/choiceView/templates/choiceView.html',
        controller: 'ChoiceViewController as choiceViewCtrl'
      })
  });
