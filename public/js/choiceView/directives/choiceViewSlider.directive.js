angular
  .module('choiceView')
  .directive('choiceViewSliderDirective', function(){
    return {
      templateUrl:'/js/choiceView/templates/choiceViewSliderDir.html',
      restrict:'EA',
      scope:{
        location: '=',
        advance: "&",
        rewind: "&",
        index: "="
      }
    }
  })
