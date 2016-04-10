var angular = require('angular');
angular
.module('curExp')
.controller('curExpController', function ($scope, CurExpService, $routeParams){

$scope.tours = CurExpService.showTours();
$scope.tour = tour;
$scope.tourObj = {};
$scope.submitTour = submitTour;


    })


  CurExpService.getTour(){
    .then(function(){
      $scope.tourObj
    }
  })

  // CurExpService.getTours(){
  //   .then(function(data){
  //     $scope.tours
  //   }
  // })

})
