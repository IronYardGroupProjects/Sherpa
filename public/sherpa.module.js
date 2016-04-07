var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('App', [
    'ngRoute',
    'AngularJeopardy'
  ])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'main.html'
      })
      .otherwise({
        redirectTo: '/404'
      })
  });
