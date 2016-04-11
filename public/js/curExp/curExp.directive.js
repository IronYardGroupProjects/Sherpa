var angular = require('angular');
angular
  .module('curExp')
  .directive('experienceDirective', function (){

    return{
      restrict: 'EA',
      templateUrl: 'curExp/templates/experience.directive.html',
    scope: {
      tour: '=',
      tourID: '='
    },
  };
});
