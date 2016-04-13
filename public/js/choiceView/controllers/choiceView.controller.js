angular
  .module('choiceView')
  .controller('choiceViewController', function($rootScope, $scope, choiceViewService){
      var vm = this;

      // getting all of the tour categories from the data to allow the user to build custom tour
      choiceViewService.getTourCategories()
        .then(function(data){
          vm.categories = data.data;
      })

      // getting the values from the check boxes
      choiceViewService.chosenCategories = function(){
        console.log("choiceview controller checked", checkedBox)
        vm.categoryChoices = [];
      }
    }
)
