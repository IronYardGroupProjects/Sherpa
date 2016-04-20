var angular = require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-touch');
require('angular-loading-bar');
// using ngSticky so the users collection scrolls with them https://github.com/d-oliveros/ngSticky
require('ngSticky');

angular
  .module('sherpa', [
    'ui.router',
    'map',
    'choiceView',
    'curExp',
    'near',
    'ngAnimate',
    'ngTouch',
    'angular-loading-bar',
    'sticky'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('landing',{
        url:'/',
        templateUrl:'templates/landing.html',
        resolve: {
          existingTour: function($state, $http, $rootScope, $timeout){
            var tour = JSON.parse(localStorage.getItem('activeTour'));
            if(tour){
              var id = tour.data;
              $http.post('/re-join/' + id).then(
                function(data){
                  $rootScope.$broadcast('change-state', 'home.map');
                },
                function(err){
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
        templateUrl: 'templates/main.html',
      });
      $urlRouterProvider.otherwise('/',{});
  })
  .run(function($rootScope, $state){
    $rootScope.$on('change-state', function (e, stateName) {
      $state.go('home.map');
     });
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $rootScope.stateLoading = true;
    })
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $rootScope.stateLoading = false;
    })
  });


require('./js/curExp');
require('./js/choiceView');
require('./js/map');
require('./js/near');
