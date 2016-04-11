var angular = require('angular');
angular
.module('curExp')
.controller('curExpController', function ($scope, CurExpService, $routeParams){

$scope.tours = tours;
$scope.tour = tour;
$scope.tourObj = {};
$scope.submitTour = submitTour;

  // CurExpService.getTours(){
  //   .then(function(data){
  //     $scope.tours
  //   }
  // })
})
