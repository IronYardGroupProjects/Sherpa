var angular = require('angular');
angular
.module('curExp')
.controller('curExpController', function ($scope, CurExpService, $routeParams){

  CurExpService.getTour()
  .then(function(data){

  })
})
