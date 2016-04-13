var angular = require('angular');
angular
  .module('curExp')
  .directive('tourModalDirective', function (){

    return{
      restrict: 'EA',
      templateUrl: 'js/curExp/templates/tour.modal.html',
    scope: {
      expTour: '=',
      tourID: '='
    },
  };
});
