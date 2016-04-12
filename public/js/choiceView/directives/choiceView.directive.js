angular
  .module('choiceView')
  .directive('choiceViewDirective', function(){
    return {
      templateUrl:'/js/choiceView/templates/choiceViewDir.html',
      restrict:'EA',
      scope:{
        cat: '='
      },
    }
  })
