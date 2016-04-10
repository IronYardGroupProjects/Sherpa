var angular = require('angular');
angular
  .module('curExp')
  .directive('experienceDirective', function (){

    return{
      restrict: 'EA',
      templateUrl: 'curExp/templates/experience.directive.html',
      /*come back to this transclusion? link? click event changes? */
    scope: {
      tour: '=',
      tourID: '@'
    },
    link: function (scope, element, attributes) {
      element.on('click', function (event){
        
      })
    }
    }
  })
