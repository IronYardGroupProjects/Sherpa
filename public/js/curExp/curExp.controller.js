var angular = require('angular');
angular
.module('curExp')
.controller('curExpController', function ($scope, curExpService, $routeParams){

  curExpService.getTour()
  .then(function(data){
    
  })
})
