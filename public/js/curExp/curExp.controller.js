var angular = require('angular');
angular
.module('curExp')
.controller('curExpController', function ($scope, CurExpService, $routeParams){
// var vm = this;
// vm.tours = CurExpService.showTours();
// vm.tour = CurExpService.showTour();

CurExpService.getTours()
  .success(function(response) {
console.log(response);
    $window.localStorage.setItem('tourId', response);

    });

  });
