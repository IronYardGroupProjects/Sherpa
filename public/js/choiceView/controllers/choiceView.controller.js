var _ = require('lodash');
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
          if(vm.categoryChoice.length < 3){
            vm.categoryChoice.push(item);
          }
      }

      // delete choices made and removed from category choice array
      vm.deleteChoice = function(choice){
        var index = vm.categoryChoice.indexOf(choice);
        vm.categoryChoice.splice(index, 1);
      }

      // submit choices added to the category choice array via the getAllCategoryLocs function from choiceViewService, ids cleaned to prevent multiple calls, and changing views to choiceViewSLider.
      vm.submitChoice = function(){
        if(vm.categoryChoice.length !== 0){
          var id = []

          // iterate over the array pulling out the id and adds it to the id array.
          vm.categoryChoice.forEach(function(el){
            return id.push(el.id)
          })

          // pass the id array into the getAllCategoryLocs function (found in the choiceViewService) then we return the data associated with that id via 'category/{id}' route.
          choiceViewService.getAllCategoryLocs(id)
            .then(function(data){
              $rootScope.locations = data;
              console.log("location data", $rootScope.locations)
            })

            // change views from choiceView to choiceViewSlider
            $state.go('home.choiceViewSlider');
        }
      }
      //selects all the active locations in the view, puts them into an array, and passes them into a startTour method.
      vm.startTour = function(){
        var ids = [];
        var locations = document.querySelectorAll('.location');
        locations = [].slice.call(locations);
        locations.forEach(function(el){
          ids.push(parseInt(el.dataset.locId));
        })
        //stores the active tour into localStorage for later reference.
        choiceViewService.startTour(ids).then(function(data){
          localStorage.setItem('activeTour', JSON.stringify(data));
          $state.go('home.map');
        });

      }

      vm.stickyRelocate = function(){
        
      }

    }
)
