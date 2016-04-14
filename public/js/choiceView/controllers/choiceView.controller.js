var _ = require('lodash')
angular
  .module('choiceView')
  .controller('choiceViewController', function($state, $rootScope, $scope, choiceViewService){
      var vm = this;
      vm.categoryChoice = [];
      vm.choiceLocations = [];
      vm.locations;
      // vm.categoryChoiceID = [];

      // getting all of the tour categories from the data to allow the user to build custom tour
      choiceViewService.getTourCategories()
        .then(function(data){
          vm.categories = data.data;
      })

      // add choices to the category choice array, limited to 3 choices.
      vm.addChoice = function(item) {
          console.log("BEFORE", vm.categoryChoice);
          if(vm.categoryChoice.length < 3){
            vm.categoryChoice.push(item);
          }
          console.log("After", vm.categoryChoice);
      }

      // delete choices made and removed from category choice array
      vm.deleteChoice = function(choice){
        var index = vm.categoryChoice.indexOf(choice);
        vm.categoryChoice.splice(index, 1);
        console.log(choice)
      }

      // submit choices added to the category choice array via the getAllCategoryLocs function from choiceViewService, ids cleaned to prevent multiple calls, and changing views to choiceViewSLider.
      vm.submitChoice = function(){
        var id = []

        // iterate over the array pulling out the id and adds it to the id array.
        vm.categoryChoice.forEach(function(el){
          return id.push(el.id)
        })

        // clean ids to remove duplicates
        var cleanId = _.uniqBy(id);

        // pass the cleanId param into the getAllCategoryLocs function (found in the choiceViewService) then we return the data associated with that id via 'category/{id}' route.
        choiceViewService.getAllCategoryLocs(id)
          .then(function(data){
            vm.locations = data;
            console.log("location data", vm.locations)
            window.glob = data;
            // vm.addChoicesToView();
          })

          // change views from choiceView to choiceViewSlider
          $state.go('home.choiceViewSlider');

      }




    }
)
