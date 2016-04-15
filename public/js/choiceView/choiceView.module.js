var angular = require('angular');
require('angular-ui-router');
var $ = jQuery = require('jquery');

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
            controller: 'choiceViewController as choiceViewCtrl'
          }
        }
      })
      .state('home.choiceViewSlider', {
        url: '/choiceViewSlider',
        views: {
          'container': {
            templateUrl:'./js/choiceView/templates/choiceViewSlider.html',
            controller: 'choiceViewController as choiceViewCtrl'
          }
        },

      })
  });
