angular
  .module('choiceView')
  .controller('choiceViewController', function($rootScope, $scope, choiceViewService){
      var vm = this;
      console.log("no data", this);
      choiceViewService.getTourCategories()
        .then(function(data){
        console.log("we've got data in the controller", data);
        window.glob1 = data
        vm.categories = data;
      })
    }
)
