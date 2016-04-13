angular
  .module('choiceView')
  .controller('choiceViewController', function($rootScope, $scope, choiceViewService){
      var vm = this;
      vm.categoryChoice = [];
      // vm.categoryChoiceID = [];

      // getting all of the tour categories from the data to allow the user to build custom tour
      choiceViewService.getTourCategories()
        .then(function(data){
          vm.categories = data.data;
      })

      vm.addChoice = function(item) {
          console.log("BEFORE", vm.categoryChoice);
          if(vm.categoryChoice.length < 3){
            vm.categoryChoice.push(item);
          }
          console.log("After", vm.categoryChoice);
      }

      vm.deleteChoice = function(choice){
        var index = vm.categoryChoice.indexOf(choice);
        vm.categoryChoice.splice(index, 1);
        console.log(choice)
      }

    }
)
