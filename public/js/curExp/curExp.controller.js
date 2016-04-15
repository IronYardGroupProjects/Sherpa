var angular = require('angular');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
angular
    .module('curExp')
    .controller('curExpController', function($rootScope, $state, $scope, CurExpService) {
        var vm = this;
        // vm.tours = CurExpService.showTours();
        // vm.tour = CurExpService.showTour();

        CurExpService.getTours()
            .then(function(data) {
                console.log("try it", data);
                // $window.localStorage.setItem('tourId', response);
                vm.tours = data.data;
                // window.glob=data.data;

            });

        vm.sendTour = function (id) {
          console.log(id);
          CurExpService.sendSelectedTour(id).then(function(data){;
            localStorage.setItem('activeTour', JSON.stringify(data));
            $state.go('home.map');
          });
        }
    });

//Updated tourID confirmation to send to Alex??
