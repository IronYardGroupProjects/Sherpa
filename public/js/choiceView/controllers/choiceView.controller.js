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
      checkedCategories = function(checkedBox){
        console.log("choiceview controller checked", checkedBox)
        choiceViewService.checkedCategories(checkedBox)
        vm.checkedBox = {};
      }
    }
)
