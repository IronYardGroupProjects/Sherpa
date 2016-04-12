angular
  .module('choiceView')
  .controller('choiceViewController', function($rootScope, $scope, choiceViewService){
      var vm = this;
      choiceViewService.getTourCategories()
        .then(function(data){
          window.glob1 = data
          vm.categories = data.data;
          console.log(vm.categories);
      })
    }
)
