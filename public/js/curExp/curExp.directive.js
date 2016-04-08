var angular = require('angular');
angular
  .module('curExp')
  .directive('experienceDirective', function (){

    return{
      /*restrict: Not sure if this will be both or just Element or Attribute */
      templateUrl: 'curExp/templates/experience.directive.html',
      /*come back to this transclusion? link? click event changes? */
    scope: {
      tour: '',
      category: '',
    },
    }
  })
