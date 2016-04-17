var angular = require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-touch');

angular
  .module('sherpa', [
    'ui.router',
    'map',
    'choiceView',
    'curExp',
    'near',
    'ngAnimate',
    'ngTouch'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('landing',{
        url:'/',
        templateUrl:'templates/landing.html',
        resolve: {
          existingTour: function($state, $http){
            var tour = JSON.parse(localStorage.getItem('activeTour'));
            if(tour){
              var id = tour.data;
              $http.post('/re-join/' + id).then(
                function(tour){
                  $state.go('home.map');
                },
                function(err){
                  console.log("Could not get tour data");
                  localStorage.removeItem('activeTour');
                }
              )
            }
          }
        }
      })
      .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'templates/main.html'
      })
      $urlRouterProvider.otherwise('/',{});
  });

require('./js/curExp');
require('./js/choiceView');
require('./js/map');
require('./js/near');
