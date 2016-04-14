var _ = require('lodash')
angular
  .module('choiceView')
  .controller('choiceViewController', function($state, $rootScope, $scope, choiceViewService){
      var vm = this;
      vm.categoryChoice = [];
      vm.choiceLocations = [];
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

      vm.submitChoice = function(){
        var id = []
        vm.categoryChoice.forEach(function(el){
          return id.push(el.id)
        })
        var cleanId = _.uniqBy(id);
        console.log(cleanId)

        choiceViewService.getAllCategoryLocs(cleanId)
          .then(function(data){
            vm.catLocs = data.data;
            console.log("category locations", data)
            window.glob = data
          })
          $state.go('home.choiceViewSlider')
      }

      vm.addChoicesToView = function(){
        vm.categoryChoice.forEach(function(el){
          return vm.choiceLocations.push(el.id)
        })
      }


    }
)
