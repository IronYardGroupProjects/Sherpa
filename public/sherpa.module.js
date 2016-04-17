var angular = require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-touch');
require('angular-loading-bar');
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
        // controller: function($rootScope, $state){
        //   $rootScope.$on('redirect', function(event, data){
        //     console.log(data);
        //     $state.go('home.map');
        //   })
        // },
        resolve: {
          existingTour: function($state, $http, $rootScope, $timeout){
            var tour = JSON.parse(localStorage.getItem('activeTour'));
            if(tour){
              var id = tour.data;
              $http.post('/re-join/' + id).then(
                function(data){
                  console.log(data);
                  $rootScope.$broadcast('change-state', 'home.map');
                  // $timeout(function() {
                  //     $state.go('home.map')
                  //  },0);
                },
                function(err){
                  console.log(err);
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
        // controller: function($rootScope, $state){
        //   $rootScope.$on('redirect', function(event, data){
        //     console.log(data);
        //     $state.go('home.map');
        //   })
        // }
      });
      $urlRouterProvider.otherwise('/',{});
  })
  .run(function($rootScope, $state){
    $rootScope.$on('change-state', function (e, stateName) {
      console.log(e);
      $state.go('home.map');
     });
  })

require('./js/curExp');
require('./js/choiceView');
require('./js/map');
require('./js/near');
