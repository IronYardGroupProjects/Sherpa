angular
  .module('choiceView')
  .directive('choiceViewSliderDirective', function(){
    return {
      templateUrl:'/js/choiceView/templates/choiceViewSliderDir.html',
      restrict:'EA',
      scope:{
        location: '=',
        index: "@",
        locationDisplay: '@',
        category: '@',
        locId: '@'
      },
      controller: function($scope) {
        $scope.advance = function(){
          if($scope.index !== ($scope.location.data.length -1)){
            $scope.index++;
            $scope.locationDisplay = $scope.location.data[$scope.index].name;
            $scope.locId = $scope.location.data[$scope.index].id;
          }
        }
        $scope.rewind = function(){
          if($scope.index !== 0){
            $scope.index--;
            $scope.locationDisplay = $scope.location.data[$scope.index].name;
            $scope.locId = $scope.location.data[$scope.index].id;
          }
        }
      },

    }
  })
