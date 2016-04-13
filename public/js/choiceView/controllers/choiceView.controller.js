angular
  .module('choiceView')
  .controller('choiceViewController', function($rootScope, $scope, choiceViewService){
      var vm = this;
      vm.categoryChoices = [];


      vm.addToChoices = function(item) {
          console.log("BEFORE", vm.categoryChoices);
          if(vm.categoryChoices.length < 3){
            vm.categoryChoices.push(item);
          }
          console.log("After", vm.categoryChoices);
      }

      // getting all of the tour categories from the data to allow the user to build custom tour
      choiceViewService.getTourCategories()
        .then(function(data){
          vm.categories = data.data;
      })

    }
)
