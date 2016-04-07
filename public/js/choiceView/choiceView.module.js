var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('App', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/choiceView', {
        templateUrl: 'choiceView/templates/choiceView.html'
      })
  });
