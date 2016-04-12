var angular = require('angular');
angular
  .module('curExp')
  .directive('experienceDirective', function (){

    return{
      restrict: 'EA',
      templateUrl: 'js/curExp/templates/experience.directive.html',
    scope: {
      expTour: '=',
      tourID: '='
    },
  };
});
