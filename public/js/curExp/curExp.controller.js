var angular = require('angular');
angular
.module('curExp')
.controller('curExpController', function ($scope, CurExpService, $routeParams){
var vm = this;

vm.tours = CurExpService.showTours();
vm.tour = CurExpService.showTour();
// $scope.tourObj = {};
// $scope.submitTour = submitTour;
//
//
    })


//   CurExpService.getTour(){
//     .then(function(){
//       $scope.tourObj
//     }
//   })
//
//   CurExpService.getTours(){
//     .then(function(data){
//       $scope.tours
//     }
//   })
//
// })
